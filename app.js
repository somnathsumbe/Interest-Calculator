(() => {
  "use strict";
  const STORAGE_KEY = "interestCalculator.history.v1";
  const MAX_HISTORY = 50;
  const $ = (selector) => document.querySelector(selector);
  const form = $("#calculatorForm");
  const currency = new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", minimumFractionDigits:2, maximumFractionDigits:2 });
  const dateFormatter = new Intl.DateTimeFormat("en-IN", { day:"2-digit", month:"short", year:"numeric" });
  let currentCalculation = null;
  const money = (value) => currency.format(value);
  const parseDate = (value) => {
    if (!value) return null;
    const [year,month,day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year,month-1,day));
    return Number.isNaN(date.getTime()) ? null : date;
  };
  const toISODate = (date) => date.toISOString().slice(0,10);
  const addMonthsClamped = (date,months) => {
    const monthIndex = date.getUTCMonth()+months;
    const year = date.getUTCFullYear()+Math.floor(monthIndex/12);
    const month = ((monthIndex%12)+12)%12;
    const lastDay = new Date(Date.UTC(year,month+1,0)).getUTCDate();
    return new Date(Date.UTC(year,month,Math.min(date.getUTCDate(),lastDay)));
  };
  const daysBetween = (a,b) => Math.round((b-a)/86400000);
  const daysInMonth = (date) => new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+1,0)).getUTCDate();
  const displayDate = (date) => dateFormatter.format(date);

  // Full month: annual nominal rate / 12. Partial month: actual days / days in that calendar month.
  // Month anniversaries are anchored to the original start date and clamped to month-end.
  function calculateInterest({principal,annualRate,startDate,endDate,type}) {
    if (!(principal>0) || annualRate<0 || !Number.isFinite(principal+annualRate)) throw new Error("Enter valid principal and rate values.");
    if (!startDate || !endDate || endDate<startDate) throw new Error("Please select a valid date range.");
    const monthlyRate = annualRate/100/12;
    const rows = [];
    let cursor = new Date(startDate), balance = principal, totalInterest = 0, period = 0;
    while (cursor<endDate) {
      const anniversary = addMonthsClamped(startDate,period+1);
      const periodEnd = anniversary<endDate ? anniversary : endDate;
      const elapsedDays = daysBetween(cursor,periodEnd);
      if (elapsedDays<=0) break;
      const fraction = periodEnd.getTime()===anniversary.getTime() ? 1 : elapsedDays/daysInMonth(cursor);
      const openingBalance = balance;
      const interestBase = type==="simple" ? principal : balance;
      const interest = interestBase*monthlyRate*fraction;
      totalInterest += interest;
      balance = principal+totalInterest;
      rows.push({period:`${displayDate(cursor)} – ${displayDate(periodEnd)}`,openingBalance,interest,closingBalance:balance,days:elapsedDays});
      cursor = periodEnd;
      period += 1;
    }
    const days = daysBetween(startDate,endDate);
    return {principal,annualRate,type,startDate:toISODate(startDate),endDate:toISODate(endDate),days,rows,totalInterest,totalAmount:principal+totalInterest,durationLabel:`${days} day${days===1?"":"s"} • ${rows.length} period${rows.length===1?"":"s"}`,calculatedAt:new Date().toISOString()};
  }

  function readForm() {
    return {principal:Number($("#principal").value),annualRate:Number($("#rate").value),startDate:parseDate($("#startDate").value),endDate:parseDate($("#endDate").value),type:$('input[name="interestType"]:checked').value};
  }
  function validateForm() {
    const principal=$("#principal"),rate=$("#rate"),start=$("#startDate"),end=$("#endDate");
    principal.setCustomValidity(Number(principal.value)>0?"":"Principal must be greater than zero.");
    rate.setCustomValidity(Number(rate.value)>=0&&Number(rate.value)<=1000?"":"Rate must be between 0 and 1000.");
    start.setCustomValidity(start.value?"":"Select a start date.");
    end.setCustomValidity(end.value&&start.value&&end.value>=start.value?"":"End date must be on or after start date.");
    form.classList.add("was-validated");
    return form.checkValidity();
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }
  function renderResult(result) {
    $("#resultType").textContent=result.type==="simple"?"Simple interest":"Compound interest";
    $("#totalAmount").textContent=money(result.totalAmount);
    $("#principalResult").textContent=money(result.principal);
    $("#interestResult").textContent=money(result.totalInterest);
    $("#durationResult").textContent=result.durationLabel;
    $("#breakdownCount").textContent=`${result.rows.length} row${result.rows.length===1?"":"s"}`;
    $("#breakdownBody").innerHTML=result.rows.map(row=>`<tr><td>${escapeHTML(row.period)}<div class="text-secondary small">${row.days} day${row.days===1?"":"s"}</div></td><td class="text-end">${money(row.openingBalance)}</td><td class="text-end text-success fw-semibold">${money(row.interest)}</td><td class="text-end fw-semibold">${money(row.closingBalance)}</td></tr>`).join("");
    $("#emptyBreakdown").classList.toggle("d-none",result.rows.length>0);
  }
  function showToast(message) {
    $("#toastMessage").textContent=message;
    bootstrap.Toast.getOrCreateInstance($("#appToast"),{delay:2600}).show();
  }
  function getHistory() {
    try { const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); return Array.isArray(value)?value:[]; }
    catch { return []; }
  }
  function renderHistory() {
    const history=getHistory();
    $("#emptyHistory").classList.toggle("d-none",history.length>0);
    $("#historyBody").innerHTML=history.map(item=>`<tr><td>${escapeHTML(dateFormatter.format(new Date(item.calculatedAt)))}</td><td>${item.type==="simple"?"Simple":"Compound"}</td><td class="text-end">${money(item.principal)}</td><td class="text-end text-success">${money(item.totalInterest)}</td><td class="text-end fw-semibold">${money(item.totalAmount)}</td><td class="text-end"><button class="history-action" type="button" data-load-id="${escapeHTML(item.id)}">Load</button></td></tr>`).join("");
  }
  function saveHistory() {
    if (!currentCalculation) return showToast("Calculate an amount before saving.");
    const history=getHistory();
    history.unshift({...currentCalculation,id:crypto.randomUUID?.()||String(Date.now())});
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(history.slice(0,MAX_HISTORY)));renderHistory();showToast("Calculation saved in this browser."); }
    catch { showToast("Unable to save. Check browser storage settings."); }
  }
  function loadHistoryItem(id) {
    const item=getHistory().find(entry=>entry.id===id);
    if (!item) return;
    $("#principal").value=item.principal;$("#rate").value=item.annualRate;
    $("#startDate").value=item.startDate;$("#endDate").value=item.endDate;
    $(`#${item.type}`).checked=true;form.classList.remove("was-validated");
    currentCalculation=calculateInterest({principal:item.principal,annualRate:item.annualRate,startDate:parseDate(item.startDate),endDate:parseDate(item.endDate),type:item.type});
    renderResult(currentCalculation);window.scrollTo({top:0,behavior:"smooth"});showToast("Saved calculation loaded.");
  }

  form.addEventListener("submit",event=>{
    event.preventDefault();
    if (!validateForm()) { form.querySelector(":invalid")?.focus(); return; }
    try { currentCalculation=calculateInterest(readForm());renderResult(currentCalculation); }
    catch(error) { showToast(error.message); }
  });
  $("#saveBtn").addEventListener("click",saveHistory);
  $("#printBtn").addEventListener("click",()=>currentCalculation?window.print():showToast("Calculate an amount before printing."));
  $("#historyBody").addEventListener("click",event=>{
    const button=event.target.closest("[data-load-id]");
    if (button) loadHistoryItem(button.dataset.loadId);
  });
  $("#clearHistoryBtn").addEventListener("click",()=>{
    if (!getHistory().length) return;
    if (window.confirm("Clear all saved calculations from this browser?")) { localStorage.removeItem(STORAGE_KEY);renderHistory();showToast("Calculation history cleared."); }
  });
  $("#resetBtn").addEventListener("click",()=>{
    setTimeout(()=>{
      form.classList.remove("was-validated");currentCalculation=null;
      $("#breakdownBody").innerHTML="";$("#breakdownCount").textContent="";
      $("#emptyBreakdown").classList.remove("d-none");
      ["totalAmount","principalResult","interestResult","durationResult"].forEach(id=>$("#"+id).textContent="—");
      $("#resultType").textContent="No calculation";
    },0);
  });
  const today=new Date(), localToday=new Date(today.getFullYear(),today.getMonth(),today.getDate());
  const yearAgo=new Date(today.getFullYear()-1,today.getMonth(),today.getDate());
  $("#startDate").value=toISODate(new Date(Date.UTC(yearAgo.getFullYear(),yearAgo.getMonth(),yearAgo.getDate())));
  $("#endDate").value=toISODate(new Date(Date.UTC(localToday.getFullYear(),localToday.getMonth(),localToday.getDate())));
  renderHistory();
  if (validateForm()) { currentCalculation=calculateInterest(readForm());renderResult(currentCalculation); }
})();