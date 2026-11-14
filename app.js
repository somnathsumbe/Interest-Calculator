(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const currency = new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2});
  const dateFormatter = new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"});
  const PROJECT_FINANCIALS = Object.freeze({
    agreementValue: 7381752,
    gstRate: 5,
    gstAmount: 369088,
    stampDutyRegistration: 251500
  });
  function renderProjectFinancials(){
    const fmt=value=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
    const packageTotal=PROJECT_FINANCIALS.agreementValue+PROJECT_FINANCIALS.gstAmount+PROJECT_FINANCIALS.stampDutyRegistration;
    $("#agreementValue").textContent=fmt(PROJECT_FINANCIALS.agreementValue);
    $("#agreementGst").textContent=fmt(PROJECT_FINANCIALS.gstAmount);
    $("#stampRegistration").textContent=fmt(PROJECT_FINANCIALS.stampDutyRegistration);
    $("#agreementPackageTotal").textContent=fmt(packageTotal);
  }
  const DEFAULT_PAYMENTS = [["2021-08-21","Builder Receipt – Agreement",108000,0],["2021-08-28","Booking Amount – HDFC",92000,0],["2021-08-31","Stamp Duty & Registration",251500,0],["2022-03-28","SBI Loan Disbursement",0,781000],["2023-04-28","VTP Altaire RERA",115000,0],["2023-05-10","SBI Loan Disbursement",0,569486],["2023-09-18","SBI Loan Disbursement",0,272224],["2024-01-19","VTP Altaire RERA",100000,0],["2024-01-25","SBI Loan Disbursement",0,675083],["2024-06-02","VTP Taxes",18456,0],["2024-06-02","VTP Altaire RERA",69088,0],["2024-06-04","SBI Loan Disbursement",0,300000],["2024-08-22","SBI Loan Disbursement",0,387541],["2024-10-03","VTP Taxes",18454,0],["2024-10-03","VTP Altaire RERA",69088,0],["2024-10-09","SBI Loan Disbursement",0,300000],["2024-11-13","SBI Loan Disbursement",0,387542],["2024-12-26","SBI Loan Disbursement",0,387541],["2025-02-22","SBI Loan Disbursement",0,387542],["2025-05-03","SBI Loan Disbursement",0,387543],["2025-06-16","SBI Loan Disbursement",0,775084],["2025-12-06","VTP Altaire RERA",369087,0],["2025-12-06","VTP Taxes",18454,0],["2026-06-16","VTP Taxes",18454,0],["2026-06-16","VTP Altaire RERA",369088,0],["2026-11-05","VTP Builder Own Contribution",369088,0],["2026-11-05","VTP Builder Own Contribution Taxes",18454,0],["2026-11-05","TDS – Builder PAN",73818,0],["2026-11-05","Township Maintenance",13601,0],["2026-11-05","Maintenance GST",14404,0],["2026-11-05","MSEB",6500,0],["2026-11-05","Society Charges – Consultant",1500,0],["2026-11-05","Society Charges – Government",600,0],["2026-11-05","Corpus Fund",42578,0],["2026-11-05","Project Maintenance",66422,0],["2026-11-05","VTP Builder Own Contribution",313724,0]].map(([date,particulars,own,sbi])=>({date,particulars,own,sbi,amount:own+sbi}));
  const DEFAULT_DEMANDS = [{"id":"D01","particulars":"Booking Amount","demandDate":"2021-08-28","dueDate":"2021-09-12","amount":210000},{"id":"D02","particulars":"Booking Amount Before Agreement","demandDate":"2021-08-28","dueDate":"2021-09-12","amount":565084},{"id":"D03","particulars":"After Agreement within 15 days","demandDate":"2021-09-18","dueDate":"2021-10-03","amount":775084},{"id":"D04","particulars":"On Completion of First Parking Level","demandDate":"2023-09-12","dueDate":"2023-09-19","amount":387542},{"id":"D05","particulars":"On Completion of Plinth","demandDate":"2024-01-16","dueDate":"2024-01-23","amount":775084},{"id":"D06","particulars":"On Completion of Podium Floor and Habitable Floor","demandDate":"2024-06-01","dueDate":"2024-06-08","amount":387542},{"id":"D07","particulars":"On Completion 4th Floor Slab","demandDate":"2024-08-16","dueDate":"2024-08-23","amount":387542},{"id":"D08","particulars":"Upon Completion of Internal Brick Work / Wall Work","demandDate":"2024-10-03","dueDate":"2024-10-10","amount":387542},{"id":"D09","particulars":"On Completion 8th Floor Slab","demandDate":"2024-11-07","dueDate":"2024-11-14","amount":387542},{"id":"D10","particulars":"On Completion 12th Floor Slab","demandDate":"2024-12-23","dueDate":"2024-12-30","amount":387542},{"id":"D11","particulars":"On Completion 16th Floor Slab","demandDate":"2025-02-21","dueDate":"2025-02-28","amount":387542},{"id":"D12","particulars":"On Completion 20th Floor Slab","demandDate":"2025-04-18","dueDate":"2025-04-25","amount":387542},{"id":"D13","particulars":"Upon Completion of Internal Plaster / Gypsum","demandDate":"2025-04-18","dueDate":"2025-04-25","amount":387542},{"id":"D14","particulars":"On Completion 25th Floor Slab","demandDate":"2025-06-10","dueDate":"2025-06-17","amount":387542},{"id":"D15","particulars":"Upon Completion of Flooring","demandDate":"2025-11-25","dueDate":"2025-12-02","amount":387542},{"id":"D16","particulars":"Upon Completion of Water Proofing","demandDate":"2026-06-15","dueDate":"2026-06-22","amount":387542},{"id":"D17","particulars":"Upon Completion of Door Frames and Windows","demandDate":"2026-11-04","dueDate":"2026-11-11","amount":387542},{"id":"D18","particulars":"At the Time of Possession","demandDate":"2026-11-04","dueDate":"2026-11-11","amount":387542},{"id":"D19","particulars":"Other Cost","demandDate":"2026-11-04","dueDate":"2026-11-11","amount":137005}];
  const DEFAULT_RECEIPTS = [{"id":"R001","reference":"VTP_Altair_2854","date":"2021-08-21","type":"Agreement","amount":108000,"funding":""},{"id":"R002","reference":"VTP_Altair_2855","date":"2021-08-28","type":"Agreement","amount":92000,"funding":""},{"id":"R003","reference":"VTP_Altair_2856","date":"2022-03-28","type":"Agreement","amount":781000,"funding":""},{"id":"R004","reference":"VTP_Altair_4427","date":"2023-04-28","type":"Agreement","amount":115000,"funding":"Own"},{"id":"R005","reference":"VTP_Altair_4417","date":"2023-05-10","type":"Agreement","amount":318,"funding":"Own"},{"id":"R006","reference":"VTP_Altair_2857","date":"2023-05-10","type":"Agreement","amount":495336,"funding":""},{"id":"R007","reference":"VTP_Altair_2858","date":"2023-05-10","type":"GST","amount":73832,"funding":""},{"id":"R008","reference":"VTP_Altair_4624","date":"2023-09-18","type":"Agreement","amount":253784,"funding":"Loan"},{"id":"R009","reference":"VTP_Altair_4666","date":"2023-09-18","type":"GST","amount":18440,"funding":"Loan"},{"id":"R010","reference":"VTP_Altair_5893","date":"2024-01-19","type":"Agreement","amount":100000,"funding":"Own"},{"id":"R011","reference":"VTP_Altair_6104","date":"2024-01-25","type":"GST","amount":36908,"funding":""},{"id":"R012","reference":"VTP_Altair_6057","date":"2024-01-25","type":"Agreement","amount":638175,"funding":""},{"id":"R013","reference":"VTP_Altair_7359","date":"2024-06-02","type":"Agreement","amount":69088,"funding":"Own"},{"id":"R014","reference":"VTP_Altair_7360","date":"2024-06-02","type":"GST","amount":18456,"funding":"Own"},{"id":"R015","reference":"VTP_Altair_7416","date":"2024-06-04","type":"Agreement","amount":300000,"funding":""},{"id":"R016","reference":"VTP_Altair_8927","date":"2024-08-22","type":"Agreement","amount":369087,"funding":"Loan"},{"id":"R017","reference":"VTP_Altair_8926","date":"2024-08-22","type":"GST","amount":18454,"funding":"Loan"},{"id":"R018","reference":"VTP_Altair_9310","date":"2024-10-03","type":"Agreement","amount":69088,"funding":"Own"},{"id":"R019","reference":"VTP_Altair_9319","date":"2024-10-03","type":"GST","amount":18454,"funding":"Own"},{"id":"R020","reference":"VTP_Altair_9458","date":"2024-10-09","type":"Agreement","amount":300000,"funding":""},{"id":"R021","reference":"VTP_Altair_9899","date":"2024-11-13","type":"Agreement","amount":387542,"funding":"Loan"},{"id":"R022","reference":"VTP_Altair_10799","date":"2024-12-26","type":"Agreement","amount":350633,"funding":""},{"id":"R023","reference":"VTP_Altair_10921","date":"2024-12-26","type":"GST","amount":36908,"funding":""},{"id":"R024","reference":"VTP_Altair_11696","date":"2025-02-22","type":"Agreement","amount":369088,"funding":"Loan"},{"id":"R025","reference":"VTP_Altair_11699","date":"2025-02-22","type":"GST","amount":18454,"funding":"Loan"},{"id":"R026","reference":"VTP_Altair_12987","date":"2025-05-03","type":"Agreement","amount":369087,"funding":""},{"id":"R027","reference":"VTP_Altair_12988","date":"2025-05-03","type":"GST","amount":18456,"funding":""},{"id":"R028","reference":"VTP_Altair_13787","date":"2025-06-16","type":"Agreement","amount":738176,"funding":""},{"id":"R029","reference":"VTP_Altair_13988","date":"2025-06-16","type":"GST","amount":36908,"funding":""},{"id":"R030","reference":"VTP_Altair_14883","date":"2025-12-06","type":"Agreement","amount":369087,"funding":"Loan"},{"id":"R031","reference":"VTP_Altair_14884","date":"2025-12-06","type":"GST","amount":18454,"funding":"Loan"},{"id":"R032","reference":"VTP_Altair_16411","date":"2026-06-16","type":"Agreement","amount":369088,"funding":"Own"},{"id":"R033","reference":"VTP_Altair_16548","date":"2026-06-16","type":"GST","amount":18454,"funding":"Own"},{"id":"R034","reference":"VTP_Altair_17243","date":"2026-11-05","type":"Agreement","amount":369087,"funding":""},{"id":"R035","reference":"VTP_Altair_17244","date":"2026-11-05","type":"GST","amount":18456,"funding":""}];
  const state = {payments:DEFAULT_PAYMENTS.map(row=>({...row})),result:[],demands:DEFAULT_DEMANDS.map(row=>({...row})),receipts:DEFAULT_RECEIPTS.map(row=>({...row})),allocations:[]};
  try{
    const saved=JSON.parse(localStorage.getItem("vtp-demand-reconciliation-v1")||"null");
    if(saved&&Array.isArray(saved.demands)&&Array.isArray(saved.allocations)){
      if(saved.demands.length===state.demands.length)state.demands=saved.demands;
      state.allocations=saved.allocations;
    }
  }catch(error){}
  function persistDemandState(){
    try{localStorage.setItem("vtp-demand-reconciliation-v1",JSON.stringify({demands:state.demands,allocations:state.allocations}));}catch(error){}
  }
  const money = value => currency.format(Number(value)||0);
  const parseISO = value => {
    if (!value) return null;
    const parts=value.split("-").map(Number);
    if(parts.length!==3 || parts.some(n=>!Number.isFinite(n))) return null;
    const date=new Date(Date.UTC(parts[0],parts[1]-1,parts[2]));
    return Number.isNaN(date.getTime())?null:date;
  };
  const iso = date => date.toISOString().slice(0,10);
  const localTodayISO = () => { const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-"); };
  const daysBetween = (start,end) => Math.round((end-start)/86400000);
  const displayDate = value => {const date=typeof value==="string"?parseISO(value):value;return date?dateFormatter.format(date):"—";};
  const escapeHTML = value => String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  const appliedRate = () => $("#rateBasis").value==="maharera" ? Number($("#mclrRate").value)+2 : Number($("#directRate").value);
  const rateLabel = () => ({maharera:"MahaRERA formula",agreement:"Agreement rate",custom:"Custom rate"}[$("#rateBasis").value]);
  function updateRateUI(){
    const basis=$("#rateBasis").value, isRera=basis==="maharera";
    $("#mclrGroup").classList.toggle("d-none",!isRera);
    $("#directRateGroup").classList.toggle("d-none",isRera);
    $("#directRateLabel").textContent=basis==="agreement"?"Agreement annual interest rate (%)":"Custom annual interest rate (%)";
    $("#directRateHelp").textContent=basis==="agreement"?"Enter the annual interest rate stated in your signed agreement.":"Enter the annual rate you want to use for this estimate.";
    const rate=appliedRate();
    $("#appliedRate").textContent=Number.isFinite(rate)?rate.toFixed(2)+"%":"—";
    $("#summaryRate").textContent=Number.isFinite(rate)?rate.toFixed(2)+"%":"—";
    $("#basisBadge").textContent=rateLabel();
  }
  function readSettings(){
    const start=parseISO($("#compensationStart").value),end=parseISO($("#calculationEnd").value),deadline=parseISO($("#possessionDeadline").value);
    const rate=appliedRate(),basis=Number($("#dayCount").value);
    if(!start||!end||end<start) throw new Error("Select a valid compensation start date and calculation end date.");
    if(!Number.isFinite(rate)||rate<0||rate>100) throw new Error("Enter a valid annual interest rate between 0 and 100%.");
    if(!Number.isFinite(basis)||basis<=0) throw new Error("Select a valid day-count basis.");
    return {start,end,deadline,rate,basis};
  }

  function buildMonthlyBreakdown(rows,settings){
    const months=new Map();
    rows.forEach(row=>{
      let cursor=parseISO(row.eligibleFrom);
      while(cursor && cursor<settings.end){
        const nextMonth=new Date(Date.UTC(cursor.getUTCFullYear(),cursor.getUTCMonth()+1,1));
        const segmentEnd=nextMonth<settings.end?nextMonth:settings.end;
        const days=daysBetween(cursor,segmentEnd);
        if(days>0){
          const key=cursor.toISOString().slice(0,7);
          const interest=row.amount*settings.rate*days/(100*settings.basis);
          const current=months.get(key)||{key,interest:0};
          current.interest+=interest;months.set(key,current);
        }
        cursor=segmentEnd;
      }
    });
    return [...months.values()].sort((a,b)=>a.key.localeCompare(b.key)).map(month=>{
      const [year,monthNo]=month.key.split("-").map(Number);
      const nextMonth=new Date(Date.UTC(year,monthNo,1));
      const cutoff=iso(nextMonth);
      const totalPaidToDate=rows.reduce((sum,row)=>sum+(row.date<cutoff?Number(row.amount)||0:0),0);
      return {...month,totalPaidToDate,label:new Intl.DateTimeFormat("en-IN",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(year,monthNo-1,1)))};
    });
  }
  function renderMonthlyBreakdown(rows,settings){
    const monthly=buildMonthlyBreakdown(rows,settings);
    $("#monthlyInterestBody").innerHTML=monthly.map(month=>`<tr>
      <td>${escapeHTML(month.label)}</td>
      <td class="text-end fw-semibold">${money(month.totalPaidToDate)}</td>
      <td class="text-end fw-semibold">${money(month.interest)}</td>
    </tr>`).join("");
    $("#monthlyInterestCount").textContent=String(monthly.length);
    $("#emptyMonthlyInterest").classList.toggle("d-none",monthly.length>0);
  }

  function calculateDemandInterest(settings){const rate=$("#lateRateMode").value==="same"?settings.rate:Number($("#lateCustomRate").value);if(!Number.isFinite(rate)||rate<0||rate>100)throw new Error("Enter a valid buyer late-payment interest rate.");
    const rows=state.demands.map(d=>{const amount=Number(d.amount)||0,due=parseISO(d.dueDate);if(!due||amount<0)throw new Error("Invalid demand date or amount: "+d.id);const entries=state.allocations.filter(a=>a.demandId===d.id).map(a=>{const r=state.receipts[Number(a.receiptIndex)];return r?{date:parseISO(r.date),amount:Number(a.amount)||0}:null;}).filter(x=>x&&x.date&&x.amount>0).sort((a,b)=>a.date-b.date);let balance=amount,cursor=due,interest=0,daysTotal=0,paid=0;entries.forEach(e=>{if(e.date>settings.end)return;const applied=Math.min(balance,e.amount);if(e.date>due&&balance>0){const stop=e.date<settings.end?e.date:settings.end;const days=Math.max(0,daysBetween(cursor,stop));interest+=balance*rate*days/(100*settings.basis);daysTotal+=days;cursor=stop;}balance=Math.max(0,balance-applied);paid+=applied;if(e.date<=due)cursor=due;});if(balance>0&&settings.end>cursor&&settings.end>due){const start=cursor<due?due:cursor;const days=Math.max(0,daysBetween(start,settings.end));interest+=balance*rate*days/(100*settings.basis);daysTotal+=days;}return {...d,paid,balance,interest,lateDays:daysTotal};});return {rows,rate,totalInterest:rows.reduce((s,r)=>s+r.interest,0),outstanding:rows.reduce((s,r)=>s+r.balance,0)};
  }
  function renderDemandReconciliation(settings){const x=calculateDemandInterest(settings);
    $("#soaReceiptBody").innerHTML=state.receipts.map(r=>"<tr><td>"+escapeHTML(r.id)+"</td><td>"+escapeHTML(r.reference)+"</td><td>"+displayDate(r.date)+"</td><td>"+escapeHTML(r.type)+"</td><td class=\"text-end\">"+money(r.amount)+"</td><td>"+escapeHTML(r.funding||"Not specified in SOA")+"</td></tr>").join("");
    $("#demandBody").innerHTML=x.rows.map((d,i)=>"<tr><td class=\"small fw-semibold\">"+d.id+"</td><td><input class=\"form-control form-control-sm demand-particular\" data-demand-index=\""+i+"\" data-demand-field=\"particulars\" value=\""+escapeHTML(d.particulars)+"\"></td><td><input class=\"form-control form-control-sm\" type=\"date\" data-demand-index=\""+i+"\" data-demand-field=\"demandDate\" value=\""+d.demandDate+"\"></td><td><input class=\"form-control form-control-sm\" type=\"date\" data-demand-index=\""+i+"\" data-demand-field=\"dueDate\" value=\""+d.dueDate+"\"></td><td><input class=\"form-control form-control-sm text-end\" type=\"number\" min=\"0\" step=\".01\" data-demand-index=\""+i+"\" data-demand-field=\"amount\" value=\""+d.amount+"\"></td><td class=\"text-end\">"+money(d.paid)+"</td><td class=\"text-end\">"+money(d.balance)+"</td><td class=\"text-end\">"+d.lateDays+"</td><td class=\"text-end fw-semibold\">"+money(d.interest)+"</td></tr>").join("");
    $("#allocationBody").innerHTML=state.allocations.map((a,i)=>"<tr><td><select class=\"form-select form-select-sm\" data-allocation-index=\""+i+"\" data-allocation-field=\"demandId\">"+state.demands.map(d=>"<option value=\""+d.id+"\" "+(d.id===a.demandId?"selected":"")+">"+escapeHTML(d.id+" — "+d.particulars)+"</option>").join("")+"</select></td><td><select class=\"form-select form-select-sm\" data-allocation-index=\""+i+"\" data-allocation-field=\"receiptIndex\">"+state.receipts.map((r,j)=>"<option value=\""+j+"\" "+(j===Number(a.receiptIndex)?"selected":"")+">"+escapeHTML(displayDate(r.date)+" — "+r.reference+" "+r.type+" ("+money(r.amount)+")")+"</option>").join("")+"</select></td><td><input class=\"form-control form-control-sm text-end\" type=\"number\" min=\"0\" step=\".01\" data-allocation-index=\""+i+"\" data-allocation-field=\"amount\" value=\""+a.amount+"\"></td><td>"+displayDate(state.receipts[Number(a.receiptIndex)]?.date)+"</td><td><button type=\"button\" class=\"btn btn-sm btn-outline-danger\" data-remove-allocation=\""+i+"\">Remove</button></td></tr>").join("");
    $("#demandLateInterest").textContent=money(x.totalInterest);$("#demandOutstanding").textContent=money(x.outstanding);$("#lateRateApplied").textContent=x.rate.toFixed(2)+"%";const gross=state.result.reduce((s,r)=>s+r.interest,0);$("#grossCompensationForNet").textContent=money(gross);const mappedReceipts=new Set(state.allocations.map(a=>Number(a.receiptIndex))).size;$("#netAfterLateInterest").textContent=mappedReceipts===state.receipts.length?money(gross-x.totalInterest):"Complete receipt mapping";
    const receiptSums={};state.allocations.forEach(a=>{receiptSums[a.receiptIndex]=(receiptSums[a.receiptIndex]||0)+(Number(a.amount)||0);});const overs=Object.keys(receiptSums).filter(k=>receiptSums[k]>(Number(state.receipts[Number(k)]?.amount)||0)+0.005);
    $("#allocationWarning").textContent=overs.length?"Warning: one or more SOA receipts are allocated for more than their receipt amount. Correct the allocations.":(state.allocations.length?"Receipt allocations are manually mapped. Verify each allocation against the original SOA. Split a receipt across demands using multiple rows.":"No receipt allocations added. Unallocated demands are currently treated as unpaid in this estimate.");
  }
  function exportDemandCSV(){const x=calculateDemandInterest(readSettings());const data=[["Demand ID","Particulars","Demand Date","Due Date","Demand Amount","Allocated Paid","Outstanding","Late Days","Buyer Late Interest"],...x.rows.map(r=>[r.id,r.particulars,r.demandDate,r.dueDate,r.amount,r.paid,r.balance,r.lateDays,r.interest])];const csv=data.map(row=>row.map(v=>"\""+String(v??"").replace(/"/g,"\"\"")+"\"").join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="vtp-demand-late-interest-reconciliation.csv";a.click();URL.revokeObjectURL(url);}
  function calculate(){
    const settings=readSettings();
    const rows=state.payments.map((payment,index)=>{
      const paymentDate=parseISO(payment.date);
      const amount=Number(payment.amount);
      if(!paymentDate||!Number.isFinite(amount)||amount<0) throw new Error("Payment row "+(index+1)+" has an invalid date or amount.");
      const accrualStart=paymentDate>settings.start?paymentDate:settings.start;
      const eligible=accrualStart<settings.end || accrualStart.getTime()===settings.end.getTime();
      const days=eligible?Math.max(0,daysBetween(accrualStart,settings.end)):0;
      const interest=eligible?amount*settings.rate*days/(100*settings.basis):0;
      return {...payment,amount,eligibleFrom:iso(accrualStart),days,interest};
    });
    state.result=rows;
    renderResult(rows,settings);
    return rows;
  }
  function renderPayments(){
    $("#emptyPayments").classList.toggle("d-none",state.payments.length>0);
    $("#paymentBody").innerHTML=state.payments.map((p,i)=>`<tr data-row="${i}">
      <td><input class="form-control form-control-sm ledger-date" type="date" data-field="date" data-index="${i}" value="${escapeHTML(p.date)}" aria-label="Payment date"></td>
      <td><input class="form-control form-control-sm ledger-particular" type="text" data-field="particulars" data-index="${i}" value="${escapeHTML(p.particulars)}" aria-label="Particulars"></td>
      <td><input class="form-control form-control-sm ledger-amount text-end" type="number" min="0" step="0.01" data-field="amount" data-index="${i}" value="${escapeHTML(p.amount)}" aria-label="Total amount"></td>
      <td class="text-end small">${escapeHTML(state.result[i]?.eligibleFrom?displayDate(state.result[i].eligibleFrom):"—")}</td>
      <td class="text-end small">${state.result[i]?.days??"—"}</td>
      <td class="text-end fw-semibold ${state.result[i]?"text-success":""}">${state.result[i]?money(state.result[i].interest):"—"}</td>
      <td class="text-nowrap"><button class="btn btn-sm btn-outline-primary me-1" type="button" data-edit="${i}">Edit</button><button class="btn btn-sm btn-outline-danger" type="button" data-remove="${i}">Delete</button></td>
    </tr>`).join("");
  }
  function renderResult(rows,settings){
    const principal=rows.reduce((sum,row)=>sum+row.amount,0);
    const interest=rows.reduce((sum,row)=>sum+row.interest,0);
    $("#totalInterest").textContent=money(interest);
    $("#eligiblePrincipal").textContent=money(principal);
    $("#summaryRate").textContent=settings.rate.toFixed(2)+"%";
    $("#appliedRate").textContent=settings.rate.toFixed(2)+"%";
    $("#paymentCount").textContent=String(rows.length);
    $("#periodSummary").textContent=displayDate(settings.start)+" – "+displayDate(settings.end);
    $("#totalDays").textContent=rows.reduce((sum,row)=>sum+row.days,0).toLocaleString("en-IN");
    $("#basisBadge").textContent=rateLabel();
    renderMonthlyBreakdown(rows,settings);
    renderPayments();
    renderDemandReconciliation(settings);
  }
  function toast(message){
    $("#toastMessage").textContent=message;
    bootstrap.Toast.getOrCreateInstance($("#appToast"),{delay:3200}).show();
  }
  function normalizeHeader(value){return String(value??"").toLowerCase().replace(/[^a-z0-9₹]/g,"");}
  function parseSheetDate(value,cell){
    if(value instanceof Date && !Number.isNaN(value.getTime())) return iso(new Date(Date.UTC(value.getFullYear(),value.getMonth(),value.getDate())));
    if(typeof value==="number" && window.XLSX){
      const parsed=XLSX.SSF.parse_date_code(value);
      if(parsed) return iso(new Date(Date.UTC(parsed.y,parsed.m-1,parsed.d)));
    }
    const raw=String(value??"").trim();
    if(!raw) return "";
    let match=raw.match(/^(\d{1,2})[-/. ]([A-Za-z]{3})[-/. ](\d{4})$/);
    if(match){const d=new Date(`${match[2]} ${match[1]}, ${match[3]}`);if(!Number.isNaN(d.getTime()))return iso(new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())));}
    match=raw.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if(match){const d=new Date(Date.UTC(Number(match[3]),Number(match[2])-1,Number(match[1])));return iso(d);}
    const d=new Date(raw);
    return Number.isNaN(d.getTime())?"":iso(new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())));
  }
  function findColumn(headers,patterns){
    return headers.findIndex(header=>patterns.some(pattern=>pattern.test(normalizeHeader(header))));
  }
  function importRows(matrix){
    if(!matrix.length) throw new Error("The selected sheet is empty.");
    let headerIndex=matrix.findIndex(row=>row.some(cell=>/date|total|amount|particular/i.test(String(cell??""))));
    if(headerIndex<0) throw new Error("Could not find a header row. Include Date and Total columns.");
    const headers=matrix[headerIndex]||[];
    const dateIndex=findColumn(headers,[/^date$/,/paymentdate/,/transactiondate/,/receiptdate/]);
    const totalIndex=findColumn(headers,[/^total₹?$/, /^totalamount$/, /total/]);
    const amountIndex=totalIndex>=0?totalIndex:findColumn(headers,[/^amount$/, /paymentamount/]);
    const particularsIndex=findColumn(headers,[/particular/,/description/,/narration/,/details/]);
    if(dateIndex<0||amountIndex<0) throw new Error("Required columns not found. Please include Date and Total (₹) columns.");
    const imported=[];
    for(let i=headerIndex+1;i<matrix.length;i++){
      const row=matrix[i]||[],date=parseSheetDate(row[dateIndex]),amount=Number(String(row[amountIndex]??"").replace(/[₹,\s]/g,""));
      if(!date || !Number.isFinite(amount) || amount<=0) continue;
      imported.push({date,particulars:String(particularsIndex>=0?row[particularsIndex]??"":"Payment").trim()||"Payment",own:0,sbi:0,amount});
    }
    if(!imported.length) throw new Error("No valid payment rows found. Check the Date and Total values.");
    state.payments=imported.sort((a,b)=>a.date.localeCompare(b.date));
    state.result=[];
    renderPayments();
    $("#importStatus").textContent=`Imported ${imported.length} payment rows. Amounts were read from the Total column when available.`;
    try{calculate();}catch(error){toast(error.message);}
  }
  async function handleFile(file){
    if(!file)return;
    try{
      const buffer=await file.arrayBuffer();
      let matrix;
      if(file.name.toLowerCase().endsWith(".csv")){
        const text=await file.text();
        matrix=text.split(/\r?\n/).filter(Boolean).map(line=>line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(cell=>cell.replace(/^"|"$/g,"").replace(/""/g,'"')));
      }else{
        if(!window.XLSX) throw new Error("Excel parser could not be loaded. Refresh the page and try again.");
        const workbook=XLSX.read(buffer,{type:"array",cellDates:true});
        const sheet=workbook.Sheets[workbook.SheetNames[0]];
        matrix=XLSX.utils.sheet_to_json(sheet,{header:1,defval:"",raw:true});
      }
      importRows(matrix);
      toast("Payment statement imported successfully.");
    }catch(error){$("#importStatus").textContent=error.message;toast(error.message);}
  }
  function exportCSV(){
    if(!state.result.length){toast("Calculate compensation before exporting.");return;}
    const headers=["Payment Date","Particulars","Total Amount (INR)","Eligible Interest Start","Eligible Days","Annual Rate (%)","Estimated Interest (INR)"];
    const lines=[headers,...state.result.map(row=>[row.date,row.particulars,row.amount,row.eligibleFrom,row.days,appliedRate().toFixed(2),row.interest])];
    const csv=lines.map(line=>line.map(value=>`"${String(value??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
    const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob),link=document.createElement("a");
    link.href=url;link.download="flat-delay-compensation-report.csv";link.click();URL.revokeObjectURL(url);
  }
  function downloadTemplate(){
    const csv="Date,Particulars,Own Contribution (₹),SBI Bank (₹),Total (₹)\r\n21-Aug-2021,Builder Receipt - Agreement,108000,0,108000\r\n";
    const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
    link.href=url;link.download="compensation-payment-template.csv";link.click();URL.revokeObjectURL(url);
  }

  $("#rateBasis").addEventListener("change",updateRateUI);
  ["mclrRate","directRate"].forEach(id=>$("#"+id).addEventListener("input",updateRateUI));
  $("#excelFile").addEventListener("change",event=>handleFile(event.target.files[0]));
  $("#calculateBtn").addEventListener("click",()=>{try{calculate();toast("Compensation recalculated.");}catch(error){toast(error.message);}});
  $("#addPaymentBtn").addEventListener("click",()=>{
    state.payments.push({date:$("#compensationStart").value||localTodayISO(),particulars:"New payment",own:0,sbi:0,amount:0});
    state.result=[];renderPayments();
  });
  $("#clearPaymentsBtn").addEventListener("click",()=>{
    if(!state.payments.length)return;
    if(window.confirm("Remove all imported payment rows?")){state.payments=[];state.result=[];renderPayments();$("#importStatus").textContent="Payment rows cleared.";}
  });
  $("#paymentBody").addEventListener("change",event=>{
    const target=event.target,index=Number(target.dataset.index),field=target.dataset.field;
    if(!field||!state.payments[index])return;
    state.payments[index][field]=field==="amount"?Number(target.value):target.value;
    state.result=[];renderPayments();
  });
  $("#paymentBody").addEventListener("click",event=>{
    const editButton=event.target.closest("[data-edit]");
    if(editButton){
      const row=document.querySelector('tr[data-row="'+editButton.dataset.edit+'"]');
      row?.querySelector('[data-field="particulars"]')?.focus();
      toast("Edit the date, particulars or total amount directly in this row, then recalculate.");
      return;
    }
    const deleteButton=event.target.closest("[data-remove]");
    if(!deleteButton)return;
    const index=Number(deleteButton.dataset.remove);
    if(window.confirm("Delete this payment entry?")){
      state.payments.splice(index,1);state.result=[];renderPayments();
      try{calculate();}catch(error){toast(error.message);}
    }
  });
  $("#demandBody").addEventListener("change",e=>{const el=e.target,i=Number(el.dataset.demandIndex),f=el.dataset.demandField;if(!f||!state.demands[i])return;state.demands[i][f]=f==="amount"?Number(el.value):el.value;persistDemandState();try{renderDemandReconciliation(readSettings());}catch(err){toast(err.message);}});
  $("#allocationBody").addEventListener("change",e=>{const el=e.target,i=Number(el.dataset.allocationIndex),f=el.dataset.allocationField;if(!f||!state.allocations[i])return;state.allocations[i][f]=f==="amount"?Number(el.value):(f==="receiptIndex"?Number(el.value):el.value);persistDemandState();try{renderDemandReconciliation(readSettings());}catch(err){toast(err.message);}});
  $("#allocationBody").addEventListener("click",e=>{const b=e.target.closest("[data-remove-allocation]");if(!b)return;state.allocations.splice(Number(b.dataset.removeAllocation),1);persistDemandState();renderDemandReconciliation(readSettings());});
  $("#addAllocationBtn").addEventListener("click",()=>{if(!state.receipts.length)return;state.allocations.push({demandId:state.demands[0].id,receiptIndex:0,amount:state.receipts[0].amount});persistDemandState();renderDemandReconciliation(readSettings());});
  $("#exportDemandBtn").addEventListener("click",()=>{try{exportDemandCSV();}catch(err){toast(err.message);}});
  $("#lateRateMode").addEventListener("change",()=>{$("#lateCustomRateGroup").classList.toggle("d-none",$("#lateRateMode").value!=="custom");try{renderDemandReconciliation(readSettings());}catch(err){toast(err.message);}});
  $("#lateCustomRate").addEventListener("input",()=>{try{renderDemandReconciliation(readSettings());}catch(err){}});
  $("#downloadTemplateBtn").addEventListener("click",downloadTemplate);
  $("#exportBtn").addEventListener("click",exportCSV);
  $("#printBtn").addEventListener("click",()=>state.result.length?window.print():toast("Calculate compensation before printing."));
  $("#calculationEnd").value=localTodayISO();
  $("#lateCustomRateGroup").classList.toggle("d-none",$("#lateRateMode").value!=="custom");
  renderProjectFinancials();updateRateUI();renderPayments();
  $("#importStatus").textContent="Loaded 36 dated payment entries from the supplied statement. SBI Life (blank Total; insurance) and undated rows were not loaded. Edit or delete entries as required.";
  try{calculate();}catch(error){toast(error.message);}
})();