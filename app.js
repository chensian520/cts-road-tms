const APP_VERSION = "2026-06-09-i18n-cachefix-v13-restored";
const STORAGE_KEY = "cts-road-freight-system-v1";
const LANG_KEY = "cts-road-freight-lang";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZv5OwKtjoQlZbxtsk2e8rRvA8q14gm5qRKuD3wd7kWXn1ngX0tG4faXKDDCh9clUe/exec";
const SERVER_MODE = location.protocol === "http:" || location.protocol === "https:";
let currentView = "dashboard";
let remoteSaveTimer = null;
let remoteStateLoaded = false;

const I18N = {
  en: {
    "Dashboard 总览": "Dashboard",
    "邮件识别中心": "Mail Recognition",
    "今日关注 & 日历": "Today & Calendar",
    "进展更新": "Progress Update",
    "Shipment / Tender": "Shipment / Tender",
    "供应商 RFQ": "Supplier RFQ",
    "Shipment 查询": "Shipment Search",
    "AR / Invoice": "AR / Invoice",
    "页面区别说明": "Page Guide",
    "管理层分析：风险、利润、报价、AR": "Management view: risk, profit, quotes and AR",
    "粘贴任意询价邮件，先识别再确认": "Paste inquiry emails, recognize first, verify before saving",
    "今天重点、团队留言、月历视图": "Today focus, team notes and calendar",
    "每天更新每票 shipment 的工作台": "Daily workbench for updating each shipment",
    "所有单票和多路线 tender": "All shipments and multi-route tenders",
    "三家供应商报价、最低价、压价和建议报价": "Supplier quotes, best price, negotiation and suggested selling price",
    "报价/AP/AR/利润": "Quote / AP / AR / Profit",
    "供应商报价、对客报价、AP、AR、Profit、Margin": "Supplier quote, customer quote, AP, AR, profit and margin",
    "输入 Offer ID 查看全流程": "Search by Offer ID to view the full workflow",
    "回款、逾期和财务风险": "Receivables, overdue and finance risk",
    "为什么这样拆页面": "Why the pages are separated",
    "系统逻辑": "System Logic",
    "邮件入口 → 识别 → 生成 Shipment/Tender → RFQ/报价 → 任务/日历 → Dashboard": "Mail intake → Recognition → Shipment/Tender → RFQ/Quote → Tasks/Calendar → Dashboard",
    "重新导入Excel数据": "Re-import Excel Data",
    "导出 JSON": "Export JSON",
    "高级筛选": "Advanced Filters",
    "全部状态": "All Statuses",
    "全部阶段": "All Stages",
    "全部客户": "All Clients",
    "全部优先级": "All Priorities",
    "全部": "All",
    "需要报价/压价": "Need Quote / Negotiation",
    "需要跟进": "Need Follow-up",
    "在途": "In Transit",
    "待POD": "Pending POD",
    "待开票/回款": "Pending Invoice / Collection",
    "风险/缺信息": "Risk / Missing Info",
    "只看需报价/压价": "Need Quote Only",
    "只看需跟进": "Need Follow-up Only",
    "只看在途": "In Transit Only",
    "只看待开票/回款": "Invoice/Collection Only",
    "清空视图筛选": "Clear View Filter",
    "新增空白 Shipment": "New Blank Shipment",
    "Shipment / Tender 运营工作台": "Shipment / Tender Operations Workbench",
    "Excel 全部明细行": "All Excel Detail Lines",
    "运营判断": "Ops Check",
    "阶段/状态": "Stage / Status",
    "Lost原因": "Lost Reason",
    "车队报价": "Carrier Quotes",
    "报价/成本/利润": "Quote / Cost / Profit",
    "货值/7%": "Cargo Value / 7%",
    "关键日期": "Key Dates",
    "下一步": "Next Action",
    "操作": "Action",
    "更新进展": "Update",
    "询价中": "Inquiry",
    "报价中": "Quoting",
    "已中标/执行中": "Won / Executing",
    "运输中": "Transporting",
    "POD/开票中": "POD / Invoicing",
    "回款中": "Collection",
    "完成": "Completed",
    "Lost/未中标": "Lost",
    "取消/搁置": "Cancelled / On Hold",
    "待询价": "Pending RFQ",
    "待报价/压价": "Pending Quote / Negotiation",
    "待客户确认": "Pending Customer Confirmation",
    "已确认待提货": "Confirmed / Pickup Pending",
    "待POD回传": "Pending POD",
    "待开票": "Pending Invoice",
    "待回款": "Pending Collection",
    "运输完成": "Transport Completed",
    "高": "High",
    "中": "Medium",
    "低": "Low",
    "缺对客报价": "Missing customer quote",
    "缺供应商成本": "Missing supplier cost",
    "Dunext高于7%需压价": "Dunext above 7%, negotiate",
    "最低车队价高于7%目标": "Best carrier price above 7% target",
    "缺Next Action": "Missing next action",
    "在途缺车牌": "In transit, plate missing",
    "在途缺司机电话": "In transit, driver phone missing",
    "待回款缺Invoice": "Collection pending, invoice missing",
    "Lost缺原因": "Lost reason missing",
    "选择更新": "Select",
    "编辑": "Edit",
    "删除": "Delete",
    "保存主票进展": "Save Main Shipment",
    "生成/追加跟进任务": "Create / Add Follow-up Task",
    "新增派送点/PO": "Add Delivery Point / PO",
    "删除选中明细": "Delete Selected Detail",
    "保存派送点/PO": "Save Delivery Point / PO",
    "粘贴客户/同事邮件": "Paste Customer / Colleague Email",
    "识别邮件": "Recognize Email",
    "确认并生成记录": "Verify and Save",
    "识别结果 / Verify": "Recognition Result / Verify",
    "识别出的路线 / 派送点 Verify": "Recognized Routes / Delivery Points Verify",
    "导出": "Export",
    "未填写": "Not Filled",
    "待报价": "Pending Quote",
    "已报价": "Quoted",
    "压价中": "Negotiating",
    "已选择": "Selected",
    "未选择": "Not Selected",
    "可以": "Yes",
    "不可以": "No",
    "待确认": "Pending",
  }
};

const CLEAN_EN = {
  "Dashboard 总览": "Dashboard",
  "邮件识别中心": "Mail Recognition",
  "今日关注 & 日历": "Today & Calendar",
  "进展更新": "Progress Update",
  "供应商 RFQ": "Supplier RFQ",
  "Shipment 查询": "Shipment Search",
  "页面区别说明": "Page Guide",
  "管理层分析：风险、利润、报价、AR": "Management view: risk, profit, quotes and AR",
  "粘贴任意询价邮件，先识别再确认": "Paste inquiry emails, recognize first, verify before saving",
  "今天重点、团队留言、月历视图": "Today focus, team notes and calendar",
  "每天更新每票 shipment 的工作台": "Daily workbench for updating each shipment",
  "所有单票和多路线 tender": "All shipments and multi-route tenders",
  "三家供应商报价、最低价、压价和建议报价": "Supplier quotes, best price, negotiation and suggested selling price",
  "报价/AP/AR/利润": "Quote / AP / AR / Profit",
  "供应商报价、对客报价、AP、AR、Profit、Margin": "Supplier quote, customer quote, AP, AR, profit and margin",
  "输入 Offer ID 查看全流程": "Search by Offer ID to view the full workflow",
  "回款、逾期和财务风险": "Receivables, overdue and finance risk",
  "为什么这样拆页面": "Why these pages are separated",
  "系统逻辑": "System Logic",
  "邮件入口 → 识别 → 生成 Shipment/Tender → RFQ/报价 → 任务/日历 → Dashboard": "Mail intake → Recognition → Shipment/Tender → RFQ/Quote → Tasks/Calendar → Dashboard",
  "重新导入Excel数据": "Re-import Excel Data",
  "导出 JSON": "Export JSON",
  "今日到期": "Due Today",
  "未来7天": "Next 7 Days",
  "团队留言": "Team Notes",
  "逾期": "Overdue",
  "日历视图": "Calendar View",
  "日历落点逻辑": "Calendar Logic",
  "重点事项跟进": "Key Follow-ups",
  "我/团队留言": "My / Team Notes",
  "编辑日历任务": "Edit Calendar Task",
  "日历任务编辑": "Calendar Task Editor",
  "保存任务": "Save Task",
  "标记完成": "Mark Complete",
  "去更新这票": "Open Shipment Update",
  "删除任务": "Delete Task",
  "添加留言": "Add Note",
  "负责人": "Owner",
  "任务类型": "Task Type",
  "具体事项": "Details",
  "截止时间": "Due Time",
  "优先级": "Priority",
  "状态": "Status",
  "备注": "Remarks",
  "未开始": "Not Started",
  "进行中": "In Progress",
  "等待供应商": "Waiting Supplier",
  "等待客户": "Waiting Customer",
  "已完成": "Completed",
  "报价确认": "Quote Confirmation",
  "目标价/压价": "Target / Negotiation",
  "询价反馈": "RFQ Feedback",
  "财务跟进": "Finance Follow-up",
  "高": "High",
  "中": "Medium",
  "低": "Low",
  "高级筛选": "Advanced Filters",
  "全部状态": "All Statuses",
  "全部阶段": "All Stages",
  "全部客户": "All Clients",
  "全部优先级": "All Priorities",
  "需要报价/压价": "Need Quote / Negotiation",
  "需要跟进": "Need Follow-up",
  "在途": "In Transit",
  "待POD": "Pending POD",
  "待开票/回款": "Pending Invoice / Collection",
  "风险/缺信息": "Risk / Missing Info",
  "更新进展": "Update",
  "编辑": "Edit",
  "删除": "Delete",
};

function mojibake(text) {
  try {
    return unescape(encodeURIComponent(text));
  } catch {
    return text;
  }
}

Object.entries(CLEAN_EN).forEach(([zh, en]) => {
  I18N.en[zh] = en;
  I18N.en[mojibake(zh)] = en;
});

function lang() {
  return localStorage.getItem(LANG_KEY) || "zh";
}

function tr(text) {
  if (lang() !== "en") return text;
  const source = String(text ?? "");
  const exact = I18N.en[source.trim()];
  if (exact) return source.replace(source.trim(), exact);
  let out = source;
  Object.entries(I18N.en)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([zh, en]) => {
      out = out.replaceAll(zh, en);
    });
  return out;
}

const navItems = [
  ["dashboard", "Dashboard 总览", "管理层分析：风险、利润、报价、AR"],
  ["inbox", "Inquiry 录入", "粘贴邮件或手动录入询价，确认后进入系统"],
  ["shipments", "Inquiry / Shipment", "每天收到的询价和已成交运输"],
  ["progress", "Shipment 进展", "成交后更新在途、POD、AR/AP和下一步"],
  ["today", "今日关注", "今天要处理的询价、运输和回款事项"],
  ["ar", "AR / Profit", "回款、逾期、收入和利润"],
];

const sampleMail = document.getElementById("mailExample").textContent.trim();

function seedData() {
  return {
    shipments: [
      {
        id: "CTSHU-ROAD-2606-18",
        type: "Shipment",
        client: "Dunext",
        status: "待报价/压价",
        route: "Hungary → Customer site",
        pickup: "",
        delivery: "",
        cargo: "General cargo",
        truck: "Curtain truck",
        cargoValue: 0,
        targetRule: "运输价格低于货值7%",
        targetPrice: 0,
        selectedSupplier: "Linktis",
        supplierCost: 2050,
        customerQuote: 0,
        margin: 0,
        etaPickup: "2026-06-08",
        etaDelivery: "",
        nextAction: "确认运输+保险报价；确认保险报价以及周一是否有车",
        owner: "Sian",
        priority: "高",
      },
      {
        id: "CTSHU-ROAD-2606-22",
        type: "Tender",
        client: "Metyx",
        status: "待供应商报价",
        route: "Kaposvár → SI/DE/PL",
        pickup: "H-7400 Kaposvár, Dombóvári Út 3657/135.",
        delivery: "Begunje / Magdeburg / Redzikowo / Gdansk",
        cargo: "General cargo",
        truck: "Only curtain / tautliner truck acceptable",
        targetRule: "Q3 fixed price, target to match Q2 rate; profit 60-100 EUR/shipment",
        rfqDeadline: "2026-06-19",
        resultDeadline: "2026-06-26",
        nextAction: "发三家供应商询价并在6/19前收齐报价",
        owner: "Sian",
        priority: "高",
        routes: [
          route("R1", "Begunje Na Gorenjskem Begunje 1 4275 Slovenia", "Slovenia", "14-16", 500, "1 truck / week"),
          route("R2", "Magdeburg August-Bebel Damm 24-30 39126 Germany", "Germany", "5-7", 1220, "n/a"),
          route("R3", "Redzikowo ul. Przemysłowa 14 76-200 Poland", "Poland", "19-21", 1090, "1 truck / week (average)"),
          route("R4", "Gdansk Miałki Szlak 25 Poland", "Poland", "19-21", 1120, ""),
        ],
      },
      {
        id: "CTSHU-ROAD-2606-28",
        type: "Shipment",
        client: "Dunext",
        status: "待报价/压价",
        route: "Dunext route",
        cargoValue: 0,
        targetRule: "目标价=货值7%",
        nextAction: "确认客户目标价、现有报价车队、客户送货时间、哪些车队可满足；6/8 10:00前报价",
        followDue: "2026-06-08T10:00",
        owner: "Sian",
        priority: "高",
      },
    ],
    tasks: [
      task("CTSHU-ROAD-2606-18", "报价确认", "确认给客人运输+保险报价；确认保险报价以及周一是否有车", "2026-06-08T10:00", "Sian", "高"),
      task("CTSHU-ROAD-2606-32", "询价反馈", "确认询价是否发出三家供应商；6/8 14:00是否得到所有供应商反馈", "2026-06-08T14:00", "Elly", "高"),
      task("CTSHU-ROAD-2606-28", "目标价/压价", "确认客户目标价=货值7%，并确认哪些车队可满足送货时间", "2026-06-08T10:00", "Sian", "高"),
      task("CTSHU-ROAD-2606-27", "目标价/压价", "确认客户目标价=货值7%，并确认哪些车队可满足送货时间", "2026-06-08T10:00", "Sian", "高"),
      task("CTSHU-ROAD-2606-23", "目标价/压价", "确认客户目标价=货值7%，并确认哪些车队可满足送货时间", "2026-06-08T10:00", "Sian", "高"),
      task("CTSHU-ROAD-2606-25", "报价确认", "确认给客人运输+保险报价；Linktis运输报价需再次确认；确认保险报价以及周一是否有车", "2026-06-08T10:00", "Sian", "高"),
      task("CTSHU-ROAD-2606-22", "Tender RFQ", "Q3 tender 4条路线发三家供应商询价并回收报价", "2026-06-19T17:00", "Team", "高"),
      task("ARAP/Overdue", "财务跟进", "ARAP 和 overdue 信息回填到系统", "2026-06-08T17:00", "Finance", "中"),
    ],
    ar: [
      { invoice: "INV-2606-001", offerId: "CTSHU-ROAD-2606-18", client: "Dunext", amount: 2450, due: "2026-06-01", status: "逾期" },
      { invoice: "INV-2606-002", offerId: "CTSHU-ROAD-2606-23", client: "Dunext", amount: 1800, due: "2026-06-15", status: "未到期" },
    ],
    notes: [
      { id: uid(), date: todayISO(), owner: "Sian", text: "今日关注希望保留日历 + 重点事项 + 团队留言，不要只做任务清单。" },
    ],
    parsed: null,
  };
}

function route(id, unloading, country, tons, target, frequency) {
  return {
    id,
    loading: "H-7400 Kaposvár, Dombóvári Út 3657/135.",
    unloading,
    country,
    mode: "1 FTL / tautliner",
    period: "Q3 2026",
    frequency,
    tons,
    target,
    suppliers: [
      { name: "Linktis", price: "" },
      { name: "", price: "" },
      { name: "", price: "" },
    ],
  };
}

function task(offerId, type, text, due, owner, priority) {
  return { id: uid(), offerId, type, text, due, owner, priority, status: "未开始", comments: "" };
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function todayISO() {
  return localDateISO(new Date());
}

function localDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (window.IMPORTED_DATA && !saved.shipmentLines) {
        return importInitialData();
      }
      return saved;
    }
  } catch {}
  const seeded = importInitialData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function importInitialData() {
  if (!window.IMPORTED_DATA) return seedData();
  const imported = window.IMPORTED_DATA;
  return {
    shipments: (imported.shipments || []).map(normalizeShipment),
    shipmentLines: imported.shipmentLines || [],
    tasks: (imported.tasks || []).map(normalizeTask),
    ar: imported.ar || [],
    notes: imported.notes || [],
    parsed: null,
    source: imported.source,
    generatedAt: imported.generatedAt,
    importedGeneratedAt: imported.generatedAt,
    appVersion: APP_VERSION,
  };
}

function normalizeShipment(s) {
  const normalized = {
    ...s,
    id: s.id || s.offerId || uid(),
    type: s.type || "Shipment",
    status: s.status || "待询价",
    pipelineStage: s.pipelineStage || inferPipelineStage(s),
    lostReason: s.lostReason || "",
    lostNote: s.lostNote || "",
    priority: s.priority || "中",
    stops: s.stops || [],
    routes: s.routes || [],
    history: s.history || [],
    carrierQuotes: normalizeCarrierQuotes(s),
  };
  const best = bestCarrierQuote(normalized);
  if (best && !Number(normalized.supplierCost || normalized.totalCost || 0)) {
    normalized.supplierCost = best.price;
    normalized.totalCost = Number(normalized.insuranceCost || 0) + best.price;
    normalized.selectedSupplier = best.carrier;
  }
  return normalized;
}

function inferPipelineStage(s) {
  const status = String(s.status || "");
  if (/Lost|未中标|做不了|取消/i.test(status)) return "Lost/未中标";
  if (/询价/.test(status)) return "Inquiry";
  if (/报价|压价|客户确认/.test(status)) return "报价中";
  if (/在途/.test(status)) return "运输中";
  if (/POD|开票/.test(status)) return "POD/开票中";
  if (/回款/.test(status)) return "回款中";
  if (/完成/.test(status)) return "完成";
  if (/已确认|提货/.test(status)) return "Shipment确认";
  return "Inquiry";
}

function isConfirmedShipment(s) {
  const text = [s.status, s.pipelineStage, s.quoteStatus, s.inquiryStatus, s.customerConfirmDate].filter(Boolean).join(" ");
  if (/Lost|未中标|取消|做不了/i.test(text)) return false;
  return /Shipment|已确认|报价已确认|客户确认|已中标|执行中|待提货|在途|POD|开票|回款|运输完成|完成/i.test(text);
}

function recordKind(s) {
  if ((s.pipelineStage || inferPipelineStage(s)) === "Lost/未中标") return "Lost Inquiry";
  return isConfirmedShipment(s) ? "Shipment" : "Inquiry";
}

function recordDate(s) {
  return dateOnly(normalizeDateDisplay(s.requestDate || s.inquiryDate || s.createdAt || s.followDue || ""));
}

function confirmedDate(s) {
  return dateOnly(normalizeDateDisplay(s.customerConfirmDate || s.confirmDate || s.quoteConfirmDate || s.requestDate || ""));
}

function isInTransitShipment(s) {
  return isConfirmedShipment(s) && /在途|运输中|已确认待提货|待提货/.test([s.status, s.pipelineStage].filter(Boolean).join(" "));
}

function pipelineStages() {
  return ["Inquiry","报价中","Shipment确认","待提货","在途","POD/开票中","回款中","完成","Lost/未中标","取消/搁置"];
}

function lostReasons() {
  return ["价格高于客户目标","车队无法满足时间","车型/车辆不匹配","路线无法安排","客户取消","客户选择其他供应商","资料不完整/MSDS问题","保险/货值风险","其他"];
}

function normalizeCarrierQuotes(s) {
  const existing = Array.isArray(s.carrierQuotes) ? s.carrierQuotes : [];
  const fromSuppliers = Array.isArray(s.suppliers)
    ? s.suppliers.map((item, idx) => ({
        id: item.id || `CQ-${idx + 1}`,
        carrier: item.name || "",
        price: Number(item.price || 0) || "",
        quoteTime: "",
        canMeetPickup: "",
        canMeetDelivery: "",
        status: item.price ? "已报价" : "待报价",
        note: "",
      }))
    : [];
  const rows = existing.length ? existing : fromSuppliers;
  while (rows.length < 3) {
    rows.push({ id: `CQ-${rows.length + 1}`, carrier: "", price: "", quoteTime: "", canMeetPickup: "", canMeetDelivery: "", status: "待报价", note: "" });
  }
  return rows.slice(0, 5);
}

function normalizeTask(t) {
  const fixedDue = fixKnownDueTime(t.offerId, t.due, t.text);
  return {
    ...t,
    id: t.id || uid(),
    due: fixedDue,
    status: t.status || "未开始",
    priority: t.priority || "中",
  };
}

function fixKnownDueTime(offerId, due, text = "") {
  const id = String(offerId || "").toUpperCase();
  if (["CTSHU-ROAD-2606-18", "CTSHU-ROAD-2606-25", "CTSHU-ROAD-2606-28", "CTSHU-ROAD-2606-27", "CTSHU-ROAD-2606-23"].includes(id)) {
    return "2026-06-08T10:00";
  }
  if (id === "CTSHU-ROAD-2606-32") return "2026-06-08T14:00";
  if (String(text).includes("14:00")) return `${dateOnly(due) || "2026-06-08"}T14:00`;
  if (String(text).includes("10:00")) return `${dateOnly(due) || "2026-06-08"}T10:00`;
  return normalizeDueValue(due);
}

function normalizeDueValue(value) {
  if (!value) return "";
  const text = String(value).trim().replace(" ", "T");
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(text)) return text.slice(0, 16);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return `${text}T17:00`;
  return text;
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  state.appVersion = APP_VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function scheduleRemoteSave() {
  if (!SERVER_MODE || !remoteStateLoaded) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(saveRemoteState, 400);
}

function googleScriptEnabled() {
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(GOOGLE_SCRIPT_URL || "");
}

function getGoogleState() {
  return new Promise((resolve, reject) => {
    const callbackName = `ctsRoadTmsJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      delete window[callbackName];
      script.remove();
      reject(new Error("Google Sheets load timeout"));
    }, 15000);
    const separator = GOOGLE_SCRIPT_URL.includes("?") ? "&" : "?";
    script.src = `${GOOGLE_SCRIPT_URL}${separator}action=load&callback=${callbackName}&v=${Date.now()}`;
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
      reject(new Error("Google Sheets script load failed"));
    };
    window[callbackName] = (payload) => {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
      resolve(payload);
    };
    document.body.appendChild(script);
  });
}

function applyRemoteState(remote) {
  state = {
    ...remote,
    shipments: (remote.shipments || []).map(normalizeShipment),
    tasks: (remote.tasks || []).map(normalizeTask),
    parsed: null,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderNav();
  showView(currentView);
}

function localStateSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function stateTime(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

function shouldKeepLocalState(remote) {
  const local = localStateSnapshot();
  if (!local || !Array.isArray(local.shipments)) return false;
  const localTime = stateTime(local.updatedAt);
  const remoteTime = stateTime(remote?.updatedAt);
  return localTime && (!remoteTime || localTime > remoteTime);
}

async function loadRemoteState() {
  if (!SERVER_MODE) return;
  if (googleScriptEnabled()) {
    try {
      const payload = await getGoogleState();
      const remote = payload && (payload.state || payload);
      remoteStateLoaded = true;
      if (remote && Array.isArray(remote.shipments)) {
        if (shouldKeepLocalState(remote)) {
          showSyncStatus("本地有较新的修改，已保留并重新提交到 Google Sheets", "amber");
          saveRemoteState();
        } else {
          applyRemoteState(remote);
          showSyncStatus("Google Sheets 团队数据已加载", "green");
        }
      } else {
        showSyncStatus("Google Sheets 已连接，正在初始化团队数据", "amber");
        saveRemoteState();
      }
    } catch (error) {
      showSyncStatus(`Google Sheets 未连接，当前为本地模式：${error.message}`, "amber");
    }
    return;
  }
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) throw new Error(`Server returned ${response.status}`);
    const remote = await response.json();
    if (remote && Array.isArray(remote.shipments)) {
      remoteStateLoaded = true;
      if (shouldKeepLocalState(remote)) {
        showSyncStatus("本地有较新的修改，已保留并重新提交到团队数据库", "amber");
        saveRemoteState();
      } else {
        applyRemoteState(remote);
        showSyncStatus("团队共享数据已加载", "green");
      }
    }
  } catch (error) {
    showSyncStatus(`共享服务器未连接，当前为本地模式：${error.message}`, "amber");
  }
}

async function saveRemoteState() {
  if (!SERVER_MODE) return;
  if (googleScriptEnabled()) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "save",
          user: localStorage.getItem("cts-road-user") || "team",
          state: { ...state, parsed: null, updatedAt: state.updatedAt || new Date().toISOString(), appVersion: APP_VERSION },
        }),
      });
      showSyncStatus("已提交保存到 Google Sheets；刷新时会优先保留最新修改", "green");
    } catch (error) {
      showSyncStatus(`同步 Google Sheets 失败：${error.message}`, "red");
    }
    return;
  }
  try {
    const response = await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-User": localStorage.getItem("cts-road-user") || "team" },
      body: JSON.stringify({ ...state, parsed: null }),
    });
    if (!response.ok) throw new Error(`Server returned ${response.status}`);
    showSyncStatus("已同步到团队数据库", "green");
  } catch (error) {
    showSyncStatus(`同步失败：${error.message}`, "red");
  }
}

function showSyncStatus(message, tone = "teal") {
  const el = document.getElementById("syncStatus");
  if (!el) return;
  el.textContent = message;
  el.className = `sync-status ${tone}`;
}

function money(n) {
  const val = Number(n || 0);
  return val ? `€ ${val.toLocaleString("en-US")}` : "";
}

function dateText(value) {
  if (!value) return "";
  return normalizeDateDisplay(value).replace("T", " ").slice(0, 16);
}

function daysBetween(dateString) {
  const normalized = normalizeDateDisplay(dateString);
  if (!normalized) return "";
  const d = new Date(String(normalized).slice(0, 10) + "T00:00:00");
  const t = new Date(todayISO() + "T00:00:00");
  const days = Math.round((d - t) / 86400000);
  return Number.isFinite(days) ? days : "";
}

function normalizeDateDisplay(value) {
  if (!value && value !== 0) return "";
  if (typeof value === "number" || /^\d{5}$/.test(String(value).trim())) {
    const serial = Number(value);
    if (serial > 20000 && serial < 80000) {
      const base = Date.UTC(1899, 11, 30);
      return localDateISO(new Date(base + serial * 86400000));
    }
  }
  return String(value);
}

function marginText(s) {
  const quote = Number(s.customerTotalQuote || s.customerQuote || 0);
  const profit = calcShipmentProfit(s);
  return quote ? `${((profit / quote) * 100).toFixed(1)}%` : "-";
}

function arForOffer(offerId) {
  const rows = (state.ar || []).filter((a) => a.offerId === offerId);
  if (!rows.length) return null;
  return rows.find((a) => a.status !== "已回款") || rows[0];
}

function arDisplay(record) {
  if (!record) return { due: "", days: "", status: "", tone: "", text: "-" };
  const days = daysBetween(record.due);
  const paid = record.status === "已回款";
  const overdue = days !== "" && days < 0 && !paid;
  const dueSoon = days !== "" && days >= 0 && days <= 7 && !paid;
  const status = paid ? "已回款" : overdue ? "逾期" : (record.status || "未回收");
  const tone = paid ? "green" : overdue ? "red" : dueSoon ? "amber" : "green";
  const dayText = days === "" ? "-" : overdue ? `${Math.abs(days)}天逾期` : `${days}天`;
  return {
    due: dateText(record.due),
    days,
    status,
    tone,
    dayText,
    text: [record.invoice && `Inv ${record.invoice}`, record.amount && `AR ${money(record.amount)}`, record.due && `Due ${dateText(record.due)}`, dayText !== "-" && dayText, status].filter(Boolean).join("<br>"),
  };
}

function arDisplayForOffer(offerId) {
  return arDisplay(arForOffer(offerId));
}

function badge(text, tone = "") {
  return `<span class="badge ${tone}">${text || "-"}</span>`;
}

function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = navItems.map(([id, label]) => `<button class="nav-item" data-view="${id}">${tr(label)}</button>`).join("");
  nav.onclick = (event) => {
    const btn = event.target.closest("[data-view]");
    if (btn) showView(btn.dataset.view);
  };
}

function showView(id) {
  currentView = id;
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  document.getElementById(`view-${id}`).classList.add("active");
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.view === id));
  const item = navItems.find((x) => x[0] === id);
  document.getElementById("pageTitle").textContent = tr(item[1]);
  document.getElementById("pageSubtitle").textContent = tr(item[2]);
  renderAll();
  applyLanguage();
}

function statusTone(status) {
  if (/逾期|压价|风险|待/.test(status)) return "amber";
  if (/完成|可报价|已回款/.test(status)) return "green";
  if (/高/.test(status)) return "red";
  return "teal";
}

function renderAll() {
  renderDashboard();
  renderInbox();
  renderToday();
  renderProgress();
  renderShipments();
  renderRfq();
  renderSearch();
  renderAr();
  renderHelp();
  applyLanguage();
}

function applyLanguage() {
  document.documentElement.lang = lang() === "en" ? "en" : "zh-CN";
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = lang() === "en" ? "中文" : "English";
  document.querySelectorAll(".nav-item").forEach((btn) => {
    const item = navItems.find((x) => x[0] === btn.dataset.view);
    if (item) btn.textContent = tr(item[1]);
  });
  const activeItem = navItems.find((x) => x[0] === currentView);
  if (activeItem) {
    document.getElementById("pageTitle").textContent = tr(activeItem[1]);
    document.getElementById("pageSubtitle").textContent = tr(activeItem[2]);
  }
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const zh = {
      systemLogicTitle: "系统逻辑",
      systemLogicText: "邮件/手动录入 → Inquiry → 客户确认 → Shipment → 在途/POD/AR → Dashboard",
      reimportExcel: "重新导入Excel数据",
      exportJson: "导出 JSON",
    }[key] || node.textContent;
    node.textContent = tr(zh);
  });
  if (lang() !== "en") return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "OPTION"].includes(parent.tagName)) return;
    const value = node.nodeValue;
    if (!value || !value.trim()) return;
    const translated = tr(value);
    if (translated !== value) node.nodeValue = translated;
  });
  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((node) => {
    node.placeholder = tr(node.placeholder);
  });
  document.querySelectorAll("option").forEach((node) => {
    const translated = tr(node.textContent);
    if (translated !== node.textContent) node.textContent = translated;
  });
}

function renderDashboard() {
  const el = document.getElementById("view-dashboard");
  const records = state.shipments;
  const today = todayISO();
  const inquiriesToday = records.filter((s) => recordDate(s) === today);
  const confirmedToday = records.filter((s) => isConfirmedShipment(s) && confirmedDate(s) === today);
  const inquiries = records.filter((s) => recordKind(s) === "Inquiry");
  const confirmedShipments = records.filter(isConfirmedShipment);
  const inTransit = records.filter(isInTransitShipment);
  const revenue = records.reduce((sum, s) => sum + Number(s.customerTotalQuote || s.customerQuote || 0), 0);
  const profit = estimateProfit();
  const openTasks = state.tasks.filter((t) => t.status !== "已完成");
  const overdueAr = state.ar.filter((x) => arDisplay(x).status === "逾期");

  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("今日Inquiry", inquiriesToday.length, "今天收到/录入的询价", "teal")}
      ${kpi("今日成交Shipment", confirmedToday.length, "今天客户确认给我们做", "green")}
      ${kpi("在途Shipments", inTransit.length, "待提货/运输中的票", "amber")}
      ${kpi("Shipment总数", confirmedShipments.length, "所有已成交运输", "purple")}
      ${kpi("Open Inquiry", inquiries.length, "还未成交/待报价", "red")}
      ${kpi("收入 AR/Quote", money(revenue), "对客报价/应收合计", "green")}
      ${kpi("预计利润", money(profit), "收入 - AP成本", "green")}
      ${kpi("AR逾期", overdueAr.length, "需要财务跟进", "red")}
    </div>
    <div class="grid cols-2" style="margin-top:16px">
      <div class="panel">
        <h3>Daily Inquiry / Shipment</h3>
        ${dailyInquiryShipmentChart(records)}
      </div>
      <div class="panel">
        <h3>当前工作池</h3>
        ${barChart({ Inquiry: inquiries.length, Shipment: confirmedShipments.length, "In Transit": inTransit.length, "AR Overdue": overdueAr.length })}
      </div>
      <div class="panel">
        <h3>今天需要盯的事项</h3>
        ${taskTable(openTasks.sort((a,b) => String(a.due).localeCompare(String(b.due))).slice(0, 8))}
      </div>
      <div class="panel">
        <h3>最近Inquiry / Shipment</h3>
        ${recentRecordsTable(records)}
      </div>
    </div>
  `;
}

function dailyInquiryShipmentChart(records) {
  const days = [...new Set(records.map(recordDate).filter(Boolean))].sort().slice(-10);
  if (!days.length) return `<div class="empty">暂无日期数据</div>`;
  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Inquiry</th><th>Confirmed Shipment</th><th>Revenue</th><th>Profit</th></tr></thead><tbody>
    ${days.map((d) => {
      const dayRecords = records.filter((s) => recordDate(s) === d);
      const confirmed = records.filter((s) => isConfirmedShipment(s) && confirmedDate(s) === d);
      const revenue = confirmed.reduce((sum, s) => sum + Number(s.customerTotalQuote || s.customerQuote || 0), 0);
      const profit = confirmed.reduce((sum, s) => sum + calcShipmentProfit(s), 0);
      return `<tr><td>${d}</td><td>${dayRecords.length}</td><td>${confirmed.length}</td><td>${money(revenue) || "-"}</td><td>${money(profit) || "-"}</td></tr>`;
    }).join("")}
  </tbody></table></div>`;
}

function recentRecordsTable(records) {
  const rows = [...records].sort((a, b) => String(recordDate(b)).localeCompare(String(recordDate(a)))).slice(0, 10);
  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>Offer</th><th>Client</th><th>Status</th><th>Next Action</th></tr></thead><tbody>
    ${rows.map((s) => `<tr><td>${recordDate(s) || "-"}</td><td>${badge(recordKind(s), recordKind(s) === "Shipment" ? "green" : "amber")}</td><td>${s.id}</td><td>${s.client || "-"}</td><td>${s.status || "-"}</td><td>${s.nextAction || "-"}</td></tr>`).join("")}
  </tbody></table></div>`;
}

function kpi(label, value, hint, tone) {
  return `<div class="panel kpi ${tone}"><div class="label">${label}</div><div class="value">${value}</div><div class="hint">${hint}</div></div>`;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const val = item[key] || "未填写";
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

function barChart(counts) {
  const entries = Object.entries(counts);
  if (!entries.length) return `<div class="empty">暂无数据</div>`;
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return entries.map(([label, value]) => `
    <div class="bar-row">
      <div>${label}</div>
      <div class="bar-track"><div class="bar" style="width:${(value / max) * 100}%"></div></div>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function estimateProfit() {
  let total = 0;
  state.shipments.forEach((s) => {
    const quote = Number(s.customerTotalQuote || s.customerQuote || 0);
    const cost = Number(s.totalCost || s.supplierCost || 0);
    if (quote > 0) total += quote - cost;
    (s.routes || []).forEach((r) => {
      const best = bestPrice(r);
      const suggested = best ? Math.max(Number(r.target || 0) + 60, best + 60) : 0;
      total += suggested && best ? suggested - best : 0;
    });
  });
  return total;
}

function renderTenderHealth() {
  const rows = state.shipments.flatMap((s) => (s.routes || []).map((r) => ({ shipment: s, route: r })));
  if (!rows.length) return `<div class="empty">暂无 Tender 路线</div>`;
  return `
    <div class="table-wrap"><table>
      <thead><tr><th>Offer</th><th>Route</th><th>Target</th><th>Best</th><th>判断</th><th>建议</th></tr></thead>
      <tbody>
      ${rows.map(({ shipment, route: r }) => {
        const best = bestPrice(r);
        const risk = !best ? "等待供应商报价" : best > Number(r.target) ? "需压价" : "可报价";
        const tone = !best ? "amber" : best > Number(r.target) ? "red" : "green";
        return `<tr>
          <td>${shipment.id}</td><td>${r.unloading}</td><td>${money(r.target)}</td><td>${money(best)}</td>
          <td>${badge(risk, tone)}</td><td>${!best ? "催三家供应商回价" : best > r.target ? "用客户目标价压供应商" : "准备对客报价"}</td>
        </tr>`;
      }).join("")}
      </tbody>
    </table></div>
  `;
}

function parseMail(text) {
  const normalized = text.replace(/\r/g, "").replace(/[ \t]+/g, " ");
  const lines = normalized.split("\n").map((x) => x.trim()).filter(Boolean);
  const offerId = (normalized.match(/CTSHU-ROAD-\d{4}-\d+/i) || [""])[0].toUpperCase();
  const lower = normalized.toLowerCase();
  const type = "Inquiry";
  const client =
    pick(/new client\s+([A-Za-z0-9ąćęłńóśźżÁÉÍÓÖŐÚÜŰáéíóöőúüű -]+)/i, normalized) ||
    pick(/Client[:：]\s*([^\n]+)/i, normalized) ||
    "";
  const cargo = /general cargo/i.test(normalized) ? "General cargo" : pick(/cargo[:：]\s*([^\n]+)/i, normalized);
  const truck = /curtain truck|tautliner/i.test(normalized)
    ? "Only curtain / tautliner truck acceptable"
    : pick(/(?:truck|vehicle)[:：]\s*([^\n]+)/i, normalized);
  const profitRule = pick(/(\d+\s*-\s*\d+\s*EUR[^.\n]*)/i, normalized);
  const deadlines = extractDeadlines(normalized);
  const tonsMap = extractTons(normalized);
  const routes = extractRoutes(lines, tonsMap);

  return {
    id: offerId || `DRAFT-${Date.now()}`,
    type,
    client: cleanupClient(client),
    cargo,
    truck,
    pickup: routes[0]?.loading || pick(/(?:Pick up|Pickup|Loading Address)[:：]\s*([^\n]+)/i, normalized),
    delivery: routes.length ? routes.map((r) => r.unloading.split(" ").slice(0, 3).join(" ")).join(" / ") : pick(/Delivery[:：]\s*([^\n]+)/i, normalized),
    route: routes.length ? `${routes[0].loading.split(",")[0]} → ${routes.length} route(s)` : "",
    targetRule: profitRule || (lower.includes("target") ? "邮件包含 target 信息，请人工核对" : ""),
    rfqDeadline: deadlines.rfqDeadline,
    resultDeadline: deadlines.resultDeadline,
    status: routes.length > 1 ? "Inquiry - 待供应商报价" : "Inquiry - 待核对",
    priority: deadlines.rfqDeadline ? "高" : "中",
    nextAction: routes.length > 1 ? "确认路线信息并发送供应商询价" : "核对识别字段后创建Inquiry",
    routes,
    raw: text,
    confidence: confidenceScore({ offerId, client, cargo, truck, routes }),
  };
}

function pick(regex, text) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function cleanupClient(value) {
  return String(value || "").replace(/[\.,].*$/, "").trim();
}

function extractDeadlines(text) {
  const result = {};
  if (/19th June 2026/i.test(text)) result.rfqDeadline = "2026-06-19";
  if (/26th June 2026/i.test(text)) result.resultDeadline = "2026-06-26";
  const iso = text.match(/20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}/);
  if (iso && !result.rfqDeadline) result.rfqDeadline = iso[0].replace(/[/.]/g, "-");
  return result;
}

function extractTons(text) {
  const map = {};
  const patterns = [
    [/(\d+)\s*[–-]\s*(\d+)\s*tons?\s+to\s+Begunje/i, "Begunje"],
    [/To\s+Magdeburg,\s*it.?s\s+(\d+)\s*[–-]\s*(\d+)\s*tons?/i, "Magdeburg"],
    [/Gdańsk\s+and\s+Redzikowo.*?(\d+)\s*[–-]\s*(\d+)\s*tons?/i, "Poland"],
  ];
  patterns.forEach(([regex, key]) => {
    const m = text.match(regex);
    if (m) map[key] = `${m[1]}-${m[2]}`;
  });
  return map;
}

function extractRoutes(lines, tonsMap) {
  const routes = [];
  const priceRegex = /^€\s*([\d ]+)/;
  for (let i = 0; i < lines.length; i++) {
    if (!/^€/.test(lines[i])) continue;
    const price = Number(lines[i].match(priceRegex)?.[1]?.replace(/\s/g, "") || 0);
    const periodIdx = findBack(lines, i, /^Q[1-4]\s+20\d{2}/i);
    const modeIdx = findBack(lines, periodIdx, /FTL|tautliner|curtain/i);
    const unloadingIdx = modeIdx - 1;
    const loadingIdx = unloadingIdx - 1;
    if (loadingIdx < 0 || !price) continue;
    const unloading = lines[unloadingIdx];
    const loading = lines[loadingIdx];
    if (!/\d|Kaposv|Address|út|u\./i.test(loading)) continue;
    const country = inferCountry(unloading);
    const cityKey = /Begunje/i.test(unloading) ? "Begunje" : /Magdeburg/i.test(unloading) ? "Magdeburg" : /Gdansk|Gdańsk|Redzikowo/i.test(unloading) ? "Poland" : "";
    routes.push({
      id: `R${routes.length + 1}`,
      loading,
      unloading,
      country,
      mode: lines[modeIdx] || "",
      period: lines[periodIdx] || "",
      frequency: lines[periodIdx + 1] && !/^€/.test(lines[periodIdx + 1]) ? lines[periodIdx + 1] : "",
      tons: tonsMap[cityKey] || "",
      target: price,
      suppliers: [
        { name: "Supplier 1", price: "" },
        { name: "Supplier 2", price: "" },
        { name: "Supplier 3", price: "" },
      ],
    });
  }
  return routes;
}

function findBack(lines, start, regex) {
  for (let i = Math.max(0, start - 1); i >= 0; i--) {
    if (regex.test(lines[i])) return i;
  }
  return -1;
}

function inferCountry(text) {
  if (/Slovenia/i.test(text)) return "Slovenia";
  if (/Germany/i.test(text)) return "Germany";
  if (/Poland|Gdansk|Gdańsk|Redzikowo/i.test(text)) return "Poland";
  return "";
}

function confidenceScore(parsed) {
  let score = 20;
  if (parsed.offerId) score += 20;
  if (parsed.client) score += 15;
  if (parsed.cargo) score += 10;
  if (parsed.truck) score += 10;
  if (parsed.routes?.length) score += 25;
  return Math.min(score, 100);
}

function renderInbox() {
  const el = document.getElementById("view-inbox");
  const parsed = state.parsed;
  el.innerHTML = `
    <div class="split">
      <div class="panel">
        <h3>粘贴客户/同事邮件</h3>
        <p class="panel-sub">不要求每封邮件都有 Q3、target、货值或路线。系统会先识别能抓到的字段，抓不到的标成“待人工核对”。</p>
        <textarea id="mailInput" placeholder="把 Outlook / WeChat / 邮件原文整段粘贴到这里...">${parsed?.raw || sampleMail}</textarea>
        <div class="toolbar" style="margin-top:12px">
          <button id="parseBtn">识别邮件</button>
          <button id="createFromParsedBtn" class="ghost" ${parsed ? "" : "disabled"}>确认并生成记录</button>
        </div>
      </div>
      <div class="panel">
        <h3>识别结果 / Verify</h3>
        ${parsed ? verifyParsedForm(parsed) : `<div class="empty">点击“识别邮件”后显示结果。识别后你可以先修改，再确认入库。</div>`}
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>识别出的路线 / 派送点 Verify</h3>
      <p class="panel-sub">这里可以修改识别出来的多路线/tender，也可以把普通 shipment 的 PO/派送点补进去。确认入库后会生成 shipment 明细。</p>
      ${parsed ? verifyRoutesForm(parsed.routes || []) : `<div class="empty">如果是单票询价，这里可以在识别后手动添加派送点/PO。</div>`}
    </div>
  `;
  document.getElementById("parseBtn").onclick = () => {
    state.parsed = parseMail(document.getElementById("mailInput").value);
    saveState();
    renderInbox();
  };
  const addRouteBtn = document.getElementById("addVerifyRouteBtn");
  if (addRouteBtn) {
    addRouteBtn.onclick = () => {
      const current = readVerifiedParsed();
      current.routes.push({ id: `R${current.routes.length + 1}`, loading: current.pickup || "", unloading: "", country: "", mode: current.truck || "", period: "", frequency: "", tons: "", target: "" });
      state.parsed = { ...state.parsed, ...current };
      saveState();
      renderInbox();
    };
  }
  document.getElementById("createFromParsedBtn").onclick = () => {
    if (!state.parsed) return;
    const verified = readVerifiedParsed();
    upsertShipment(verified);
    createLinesFromVerified(verified);
    state.tasks.push(task(verified.id, "Inquiry跟进", verified.nextAction, `${verified.rfqDeadline || todayISO()}T17:00`, "Team", verified.priority || "中"));
    saveState();
    showView("shipments");
  };
}

function readVerifiedParsed() {
  const routes = [];
  for (let i = 0; i < 30; i++) {
    const use = document.getElementById(`vrUse${i}`);
    if (!use) continue;
    if (!use.checked) continue;
    routes.push({
      id: document.getElementById(`vrId${i}`)?.value || `R${i + 1}`,
      loading: document.getElementById(`vrLoading${i}`)?.value || "",
      unloading: document.getElementById(`vrUnloading${i}`)?.value || "",
      country: document.getElementById(`vrCountry${i}`)?.value || "",
      mode: document.getElementById(`vrMode${i}`)?.value || "",
      period: document.getElementById(`vrPeriod${i}`)?.value || "",
      frequency: document.getElementById(`vrFrequency${i}`)?.value || "",
      tons: document.getElementById(`vrTons${i}`)?.value || "",
      target: readNumber(`vrTarget${i}`),
      suppliers: [
        { name: "Supplier 1", price: "" },
        { name: "Supplier 2", price: "" },
        { name: "Supplier 3", price: "" },
      ],
    });
  }
  return {
    ...(state.parsed || {}),
    type: document.getElementById("verifyType")?.value || "Shipment",
    id: document.getElementById("verifyOfferId")?.value.trim() || `DRAFT-${Date.now()}`,
    client: document.getElementById("verifyClient")?.value.trim() || "待确认",
    status: document.getElementById("verifyStatus")?.value || "待询价",
    requestDate: todayISO(),
    rfqDeadline: document.getElementById("verifyRfqDeadline")?.value || "",
    resultDeadline: document.getElementById("verifyResultDeadline")?.value || "",
    pickup: document.getElementById("verifyPickup")?.value || "",
    delivery: document.getElementById("verifyDelivery")?.value || "",
    route: `${document.getElementById("verifyPickup")?.value || ""} → ${document.getElementById("verifyDelivery")?.value || ""}`,
    cargo: document.getElementById("verifyCargo")?.value || "",
    truck: document.getElementById("verifyTruck")?.value || "",
    priority: document.getElementById("verifyPriority")?.value || "中",
    targetRule: document.getElementById("verifyTargetRule")?.value || "",
    nextAction: document.getElementById("verifyNextAction")?.value || "核对客户需求并发供应商询价",
    routes,
    verifiedAt: new Date().toISOString(),
  };
}

function createLinesFromVerified(verified) {
  if (!verified.routes || !verified.routes.length) return;
  state.shipmentLines = (state.shipmentLines || []).filter((line) => line.offerId !== verified.id || !String(line.rowId || "").startsWith("MAIL-"));
  let newRow = nextLineRow();
  verified.routes.forEach((r, idx) => {
    const line = createEmptyLine({
      id: verified.id,
      client: verified.client,
      status: verified.status,
      pickup: verified.pickup,
      delivery: verified.delivery,
    });
    line.rowId = `MAIL-${Date.now()}-${idx + 1}`;
    line.excelRow = newRow++;
    line.offerId = verified.id;
    line.client = verified.client;
    line.status = verified.status;
    line.po = r.id;
    line.sequence = String(idx + 1);
    line.pickup = r.loading || verified.pickup;
    line.pickupAddress = r.loading || verified.pickup;
    line.delivery = r.unloading || verified.delivery;
    line.deliveryAddress = r.unloading || verified.delivery;
    line.route = `${line.pickupAddress} → ${line.deliveryAddress}`;
    line.poNote = r.frequency || "";
    line.cargoRequirement = [verified.cargo, verified.truck, r.tons ? `${r.tons} tons` : ""].filter(Boolean).join(" / ");
    line.customerTarget = r.target || "";
    line.customerTotalQuote = 0;
    line.nextAction = verified.nextAction;
    state.shipmentLines.unshift(line);
  });
}

function verifyParsedForm(p) {
  return `
    <div class="chips" style="margin-bottom:14px">
      ${badge("Inquiry", "amber")}
      ${badge(`置信度 ${p.confidence}%`, p.confidence >= 75 ? "green" : "amber")}
      ${badge("请先Verify再入库", "amber")}
    </div>
    <div class="form-row three">
      <label>类型
        <select id="verifyType">${["Inquiry","Shipment"].map((x) => `<option ${x === (p.type || "Inquiry") ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
      <label>Offer ID<input id="verifyOfferId" value="${escapeAttr(p.id || "")}" /></label>
      <label>Client<input id="verifyClient" value="${escapeAttr(p.client || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>主状态
        <select id="verifyStatus">${["Inquiry - 待核对","Inquiry - 待供应商报价","Inquiry - 待给客人报价","Inquiry - 待客户确认","已确认待提货","在途","待POD回传","待开票","待回款","运输完成"].map((x) => `<option ${x === (p.status || "Inquiry - 待核对") ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
      <label>RFQ截止<input id="verifyRfqDeadline" type="date" value="${dateOnly(p.rfqDeadline || "")}" /></label>
      <label>结果/客户截止<input id="verifyResultDeadline" type="date" value="${dateOnly(p.resultDeadline || "")}" /></label>
    </div>
    <label style="display:block;margin-top:12px">提货地址<textarea id="verifyPickup" style="min-height:70px">${escapeHtml(p.pickup || "")}</textarea></label>
    <label style="display:block;margin-top:12px">送货/路线概述<textarea id="verifyDelivery" style="min-height:70px">${escapeHtml(p.delivery || "")}</textarea></label>
    <div class="form-row three" style="margin-top:12px">
      <label>货物<input id="verifyCargo" value="${escapeAttr(p.cargo || "")}" /></label>
      <label>车型要求<input id="verifyTruck" value="${escapeAttr(p.truck || "")}" /></label>
      <label>优先级<select id="verifyPriority">${["高","中","低"].map((x) => `<option ${x === (p.priority || "中") ? "selected" : ""}>${x}</option>`).join("")}</select></label>
    </div>
    <label style="display:block;margin-top:12px">目标价/利润规则<textarea id="verifyTargetRule" style="min-height:70px">${escapeHtml(p.targetRule || "")}</textarea></label>
    <label style="display:block;margin-top:12px">Next Action<textarea id="verifyNextAction" style="min-height:80px">${escapeHtml(p.nextAction || "")}</textarea></label>
  `;
}

function verifyRoutesForm(routes) {
  const rows = routes.length ? routes : [{ id: "R1", loading: "", unloading: "", country: "", mode: "", period: "", frequency: "", tons: "", target: "" }];
  return `<div class="table-wrap"><table>
    <thead><tr><th>Use</th><th>ID/PO</th><th>Loading/Pickup</th><th>Unloading/Delivery</th><th>Country</th><th>Mode</th><th>Period</th><th>Frequency</th><th>Tons</th><th>Target</th></tr></thead>
    <tbody>${rows.map((r, i) => `<tr>
      <td><input id="vrUse${i}" type="checkbox" ${routes.length ? "checked" : ""} /></td>
      <td><input id="vrId${i}" value="${escapeAttr(r.id || `R${i + 1}`)}" /></td>
      <td><textarea id="vrLoading${i}" style="min-height:60px">${escapeHtml(r.loading || "")}</textarea></td>
      <td><textarea id="vrUnloading${i}" style="min-height:60px">${escapeHtml(r.unloading || "")}</textarea></td>
      <td><input id="vrCountry${i}" value="${escapeAttr(r.country || "")}" /></td>
      <td><input id="vrMode${i}" value="${escapeAttr(r.mode || "")}" /></td>
      <td><input id="vrPeriod${i}" value="${escapeAttr(r.period || "")}" /></td>
      <td><input id="vrFrequency${i}" value="${escapeAttr(r.frequency || "")}" /></td>
      <td><input id="vrTons${i}" value="${escapeAttr(r.tons || "")}" /></td>
      <td><input id="vrTarget${i}" type="number" step="0.01" value="${Number(r.target || 0) || ""}" /></td>
    </tr>`).join("")}</tbody>
  </table></div>
  <div class="toolbar" style="margin-top:12px">
    <button id="addVerifyRouteBtn" class="ghost">增加一行派送点</button>
  </div>`;
}

function parsedSummary(p) {
  return `
    <div class="chips" style="margin-bottom:14px">
      ${badge(p.type || "Inquiry", (p.type || "Inquiry") === "Shipment" ? "green" : "amber")}
      ${badge(`置信度 ${p.confidence}%`, p.confidence >= 75 ? "green" : "amber")}
      ${badge(p.id)}
    </div>
    <div class="table-wrap"><table><tbody>
      ${summaryRow("客户", p.client)}
      ${summaryRow("货物", p.cargo)}
      ${summaryRow("车型", p.truck)}
      ${summaryRow("起运", p.pickup)}
      ${summaryRow("目的地", p.delivery)}
      ${summaryRow("报价截止", p.rfqDeadline)}
      ${summaryRow("结果通知", p.resultDeadline)}
      ${summaryRow("目标/利润规则", p.targetRule)}
      ${summaryRow("下一步", p.nextAction)}
    </tbody></table></div>
  `;
}

function summaryRow(label, value) {
  return `<tr><th style="width:130px">${label}</th><td>${value || `<span class="danger-text">待人工核对</span>`}</td></tr>`;
}

function upsertShipment(parsed) {
  const index = state.shipments.findIndex((s) => s.id === parsed.id);
  const record = {
    id: parsed.id,
    type: parsed.type,
    client: parsed.client || "待确认",
    status: parsed.status,
    requestDate: parsed.requestDate || todayISO(),
    pipelineStage: parsed.type === "Shipment" ? "Shipment确认" : "Inquiry",
    route: parsed.route,
    pickup: parsed.pickup,
    delivery: parsed.delivery,
    cargo: parsed.cargo,
    truck: parsed.truck,
    targetRule: parsed.targetRule,
    rfqDeadline: parsed.rfqDeadline,
    resultDeadline: parsed.resultDeadline,
    nextAction: parsed.nextAction,
    owner: "Team",
    priority: parsed.priority,
    routes: parsed.routes,
  };
  if (index >= 0) state.shipments[index] = { ...state.shipments[index], ...record };
  else state.shipments.unshift(record);
}

function renderToday() {
  const el = document.getElementById("view-today");
  const sorted = [...state.tasks].sort((a, b) => String(a.due).localeCompare(String(b.due)));
  const selectedTask = state.tasks.find((t) => t.id === sessionStorage.getItem("selectedTaskId")) || null;
  const selectedNote = state.notes.find((n) => n.id === sessionStorage.getItem("selectedNoteId")) || null;
  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("今天到期", sorted.filter(t => daysBetween(t.due) === 0 && t.status !== "已完成").length, "今天必须处理", "red")}
      ${kpi("未来7天", sorted.filter(t => daysBetween(t.due) >= 0 && daysBetween(t.due) <= 7 && t.status !== "已完成").length, "提前安排", "amber")}
      ${kpi("团队留言", state.notes.length, "手动补充事项", "purple")}
      ${kpi("逾期", sorted.filter(t => daysBetween(t.due) < 0 && t.status !== "已完成").length, "需要追", "red")}
    </div>
    <div class="split" style="margin-top:16px">
      <div class="panel">
        <h3>日历视图</h3>
        <p class="panel-sub">这里是你要的“日期格式”：提货、送货、报价截止、会议、手动留言都可以落到日期上。</p>
        <div class="note-card">
          <strong>日历落点逻辑</strong>
          <p>红色/蓝色任务卡来自“任务池”的 Due Date；紫色卡来自“团队留言”的日期。任务卡可以点击后编辑、完成或删除；留言在右侧留言区编辑/删除。</p>
        </div>
        ${calendarHtml(new Date(), state.tasks, state.notes)}
      </div>
      <div class="grid">
        <div class="panel">
          <h3>${selectedTask ? "编辑日历任务" : "日历任务编辑"}</h3>
          <p class="panel-sub">点击日历里的任务卡，会在这里编辑。不会再弹出浏览器输入框。</p>
          ${selectedTask ? taskEditForm(selectedTask) : `<div class="empty">请选择日历中的任务卡，或在重点事项里选择一条任务。</div>`}
        </div>
        <div class="panel">
          <h3>重点事项跟进</h3>
          ${taskTable(sorted.filter(t => t.status !== "已完成").slice(0, 10))}
        </div>
        <div class="panel">
          <h3>${selectedNote ? "编辑团队留言" : "我/团队留言"}</h3>
          <div class="form-row three">
            <input id="noteOwner" placeholder="负责人" value="${escapeAttr(selectedNote?.owner || "Sian")}" />
            <input id="noteDate" type="date" value="${escapeAttr(selectedNote?.date || todayISO())}" />
            <button id="addNoteBtn">${selectedNote ? "保存留言" : "添加留言"}</button>
          </div>
          <textarea id="noteText" style="min-height:80px;margin-top:10px" placeholder="例如：6/12 需要和 Linktis 见面；或提醒同事确认保险报价">${escapeHtml(selectedNote?.text || "")}</textarea>
          ${selectedNote ? `<div class="toolbar" style="margin-top:10px"><button id="cancelNoteEditBtn" class="ghost">取消编辑</button></div>` : ""}
          <div style="margin-top:12px">${notesHtml()}</div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("addNoteBtn").onclick = () => {
    const text = document.getElementById("noteText").value.trim();
    if (!text) return;
    const editing = state.notes.find((n) => n.id === sessionStorage.getItem("selectedNoteId"));
    if (editing) {
      editing.owner = document.getElementById("noteOwner").value || "Team";
      editing.date = document.getElementById("noteDate").value || todayISO();
      editing.text = text;
      sessionStorage.removeItem("selectedNoteId");
    } else {
      state.notes.unshift({ id: uid(), owner: document.getElementById("noteOwner").value || "Team", date: document.getElementById("noteDate").value || todayISO(), text });
    }
    saveState();
    renderToday();
  };
  const cancelNote = document.getElementById("cancelNoteEditBtn");
  if (cancelNote) cancelNote.onclick = () => {
    sessionStorage.removeItem("selectedNoteId");
    renderToday();
  };
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  if (saveTaskBtn) saveTaskBtn.onclick = saveSelectedTaskFromForm;
  const doneTaskBtn = document.getElementById("doneTaskBtn");
  if (doneTaskBtn) doneTaskBtn.onclick = () => updateSelectedTaskStatus("已完成");
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");
  if (deleteTaskBtn) deleteTaskBtn.onclick = deleteSelectedTask;
  const goTaskShipmentBtn = document.getElementById("goTaskShipmentBtn");
  if (goTaskShipmentBtn) goTaskShipmentBtn.onclick = goSelectedTaskShipment;
}

function taskEditForm(t) {
  return `
    <div class="form-row">
      <label>Offer ID<input id="taskOfferId" value="${escapeAttr(t.offerId || "")}" /></label>
      <label>任务类型<input id="taskType" value="${escapeAttr(t.type || "")}" /></label>
    </div>
    <label style="display:block;margin-top:12px">具体事项<textarea id="taskText" style="min-height:80px">${escapeHtml(t.text || "")}</textarea></label>
    <div class="form-row three" style="margin-top:12px">
      <label>截止时间<input id="taskDue" type="datetime-local" value="${toDateTimeLocal(t.due || "")}" /></label>
      <label>负责人<input id="taskOwner" value="${escapeAttr(t.owner || "")}" /></label>
      <label>优先级<select id="taskPriority">${["高","中","低"].map((x) => `<option ${x === (t.priority || "中") ? "selected" : ""}>${x}</option>`).join("")}</select></label>
    </div>
    <div class="form-row" style="margin-top:12px">
      <label>状态<select id="taskStatus">${["未开始","进行中","等待供应商","等待客户","已完成"].map((x) => `<option ${x === (t.status || "未开始") ? "selected" : ""}>${x}</option>`).join("")}</select></label>
      <label>备注<input id="taskComments" value="${escapeAttr(t.comments || "")}" /></label>
    </div>
    <div class="toolbar" style="margin-top:12px">
      <button id="saveTaskBtn">保存任务</button>
      <button id="doneTaskBtn" class="ghost">标记完成</button>
      <button id="goTaskShipmentBtn" class="ghost">去更新这票</button>
      <button id="deleteTaskBtn" class="ghost">删除任务</button>
    </div>
  `;
}

function selectedTask() {
  return state.tasks.find((t) => t.id === sessionStorage.getItem("selectedTaskId"));
}

function saveSelectedTaskFromForm() {
  const t = selectedTask();
  if (!t) return;
  t.offerId = document.getElementById("taskOfferId").value.trim();
  t.type = document.getElementById("taskType").value.trim();
  t.text = document.getElementById("taskText").value.trim();
  t.due = normalizeDueValue(document.getElementById("taskDue").value);
  t.owner = document.getElementById("taskOwner").value.trim();
  t.priority = document.getElementById("taskPriority").value;
  t.status = document.getElementById("taskStatus").value;
  t.comments = document.getElementById("taskComments").value.trim();
  saveState();
  renderToday();
}

function updateSelectedTaskStatus(status) {
  const t = selectedTask();
  if (!t) return;
  t.status = status;
  saveState();
  renderToday();
}

function deleteSelectedTask() {
  const t = selectedTask();
  if (!t) return;
  if (!confirm(`确定删除任务？\n${t.offerId} / ${t.type}`)) return;
  state.tasks = state.tasks.filter((item) => item.id !== t.id);
  sessionStorage.removeItem("selectedTaskId");
  saveState();
  renderToday();
}

function goSelectedTaskShipment() {
  const t = selectedTask();
  if (!t) return;
  sessionStorage.setItem("selectedOfferId", t.offerId);
  sessionStorage.setItem("progressSearch", t.offerId);
  showView("progress");
}

function renderProgressLegacyUnused() {
  const el = document.getElementById("view-progress");
  const selectedId = sessionStorage.getItem("selectedOfferId") || state.shipments[0]?.id || "";
  const shipment = state.shipments.find((s) => s.id === selectedId) || state.shipments[0];
  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("总Shipment", state.shipments.length, "已按Offer ID聚合", "teal")}
      ${kpi("待更新Next Action", state.shipments.filter(s => !s.nextAction).length, "建议补齐", "amber")}
      ${kpi("待POD", state.shipments.filter(s => /待|未|Pending/i.test(s.podStatus || "")).length, "运输完成后跟进", "purple")}
      ${kpi("高优先级", state.shipments.filter(s => s.priority === "高").length, "需要盯紧", "red")}
    </div>
    <div class="split" style="margin-top:16px">
      <div class="panel">
        <h3>选择并更新 Shipment</h3>
        <p class="panel-sub">这里就是你每天更新每票进展的地方。更新后 Dashboard、今日关注、查询页都会使用这份数据。</p>
        <div class="toolbar">
          <select id="progressSelect">
            ${state.shipments.map((s) => `<option value="${s.id}" ${s.id === shipment?.id ? "selected" : ""}>${s.id} · ${s.client || "-"} · ${s.status || "-"}</option>`).join("")}
          </select>
          <button id="goSearchBtn" class="ghost">去查询详情</button>
        </div>
        ${shipment ? progressForm(shipment) : `<div class="empty">暂无shipment数据</div>`}
      </div>
      <div class="grid">
        <div class="panel">
          <h3>当前票关键资料</h3>
          ${shipment ? shipmentMini(shipment) : `<div class="empty">请选择shipment</div>`}
        </div>
        <div class="panel">
          <h3>进展历史</h3>
          ${shipment ? historyHtml(shipment) : `<div class="empty">暂无历史</div>`}
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>最近需要更新的票</h3>
      ${shipmentTable(state.shipments.filter(s => /待|在途|报价|压价|POD|回款|供应商/.test(s.status || s.nextAction || "")).slice(0, 15))}
    </div>
  `;
  const select = document.getElementById("progressSelect");
  if (select) {
    select.onchange = () => {
      sessionStorage.setItem("selectedOfferId", select.value);
      renderProgress();
    };
  }
  const saveBtn = document.getElementById("saveProgressBtn");
  if (saveBtn && shipment) {
    saveBtn.onclick = () => saveProgress(shipment.id);
  }
  const taskBtn = document.getElementById("createProgressTaskBtn");
  if (taskBtn && shipment) {
    taskBtn.onclick = () => {
      const due = document.getElementById("progressFollowDue").value || `${todayISO()}T17:00`;
      const text = document.getElementById("progressNextAction").value || "跟进shipment进展";
      state.tasks.unshift(task(shipment.id, "进展跟进", text, due, document.getElementById("progressOwner").value || "Team", document.getElementById("progressPriority").value || "中"));
      saveState();
      renderProgress();
    };
  }
  const goSearch = document.getElementById("goSearchBtn");
  if (goSearch && shipment) {
    goSearch.onclick = () => {
      sessionStorage.setItem("searchOfferId", shipment.id);
      showView("search");
    };
  }
}

function progressForm(s) {
  return `
    <div class="form-row three">
      <label>主状态
        <select id="progressStatus">
          ${["待询价","待报价/压价","待客户确认","已确认待提货","在途","待POD回传","待开票","待回款","运输完成","取消/暂停"].map(x => `<option ${x === s.status ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>负责人
        <input id="progressOwner" value="${escapeAttr(s.owner || "Team")}" />
      </label>
      <label>优先级
        <select id="progressPriority">
          ${["高","中","低"].map(x => `<option ${x === s.priority ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>车牌号
        <input id="progressPlate" value="${escapeAttr(s.plate || "")}" />
      </label>
      <label>司机
        <input id="progressDriver" value="${escapeAttr(s.driver || "")}" />
      </label>
      <label>司机电话
        <input id="progressDriverPhone" value="${escapeAttr(s.driverPhone || "")}" />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>提货 ETA
        <input id="progressPickupEta" type="datetime-local" value="${toDateTimeLocal(s.etaPickup || s.pickupEta || "")}" />
      </label>
      <label>送货 ETA
        <input id="progressDeliveryEta" type="datetime-local" value="${toDateTimeLocal(s.etaDelivery || s.deliveryEta || "")}" />
      </label>
      <label>Follow-up Due
        <input id="progressFollowDue" type="datetime-local" value="${toDateTimeLocal(s.followDue || "")}" />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>供应商/AP成本
        <input id="progressSupplierCost" type="number" step="0.01" value="${Number(s.supplierCost || s.totalCost || 0) || ""}" />
      </label>
      <label>保险成本
        <input id="progressInsuranceCost" type="number" step="0.01" value="${Number(s.insuranceCost || 0) || ""}" />
      </label>
      <label>总成本/AP
        <input id="progressTotalCost" type="number" step="0.01" value="${Number(s.totalCost || s.supplierCost || 0) || ""}" />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>对客运输报价
        <input id="progressCustomerQuote" type="number" step="0.01" value="${Number(s.customerQuote || s.customerTransportQuote || 0) || ""}" />
      </label>
      <label>对客总报价/AR
        <input id="progressCustomerTotalQuote" type="number" step="0.01" value="${Number(s.customerTotalQuote || s.customerQuote || 0) || ""}" />
      </label>
      <label>利润自动计算
        <input id="progressProfitPreview" value="${money(calcShipmentProfit(s))}" disabled />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>POD状态
        <select id="progressPod">
          ${["","待POD回传","已收到POD","已回传客户","无需POD"].map(x => `<option value="${x}" ${x === (s.podStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}
        </select>
      </label>
      <label>Invoice No
        <input id="progressInvoice" value="${escapeAttr(s.invoiceNo || "")}" />
      </label>
      <label>Invoice Due
        <input id="progressInvoiceDue" type="date" value="${dateOnly(s.invoiceDue || "")}" />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>AR状态
        <select id="progressArStatus">
          ${["","未回收","部分回收","已回款","待开票","PI已发待确认"].map(x => `<option value="${x}" ${x === (s.arStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}
        </select>
      </label>
      <label>AP状态
        <select id="progressApStatus">
          ${["","未收供应商账单","已收供应商账单","已付款","争议中"].map(x => `<option value="${x}" ${x === (s.apStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}
        </select>
      </label>
      <label>供应商/车队
        <input id="progressSelectedSupplier" value="${escapeAttr(s.selectedSupplier || "")}" />
      </label>
    </div>
    <label style="display:block;margin-top:12px">Next Action
      <textarea id="progressNextAction" style="min-height:90px">${escapeHtml(s.nextAction || "")}</textarea>
    </label>
    <label style="display:block;margin-top:12px">本次更新备注
      <textarea id="progressUpdateNote" style="min-height:70px" placeholder="例如：已联系Linktis，周一可安排车；保险报价等待确认。"></textarea>
    </label>
    <div class="toolbar" style="margin-top:12px">
      <button id="saveProgressBtn">保存进展</button>
      <button id="createProgressTaskBtn" class="ghost">生成/追加跟进任务</button>
    </div>
  `;
}

function saveProgress(id) {
  const s = state.shipments.find((item) => item.id === id);
  if (!s) return;
  const before = { status: s.status, nextAction: s.nextAction };
  const clientEl = document.getElementById("progressClient");
  const pickupEl = document.getElementById("progressPickup");
  const deliveryEl = document.getElementById("progressDelivery");
  const routeEl = document.getElementById("progressRoute");
  const cargoRequirementEl = document.getElementById("progressCargoRequirement");
  if (clientEl) s.client = clientEl.value;
  if (pickupEl) s.pickup = pickupEl.value;
  if (deliveryEl) s.delivery = deliveryEl.value;
  if (routeEl) s.route = routeEl.value;
  if (cargoRequirementEl) s.cargoRequirement = cargoRequirementEl.value;
  s.status = document.getElementById("progressStatus").value;
  s.pipelineStage = document.getElementById("progressPipelineStage")?.value || inferPipelineStage(s);
  s.lostReason = document.getElementById("progressLostReason")?.value || "";
  s.lostNote = document.getElementById("progressLostNote")?.value || "";
  if (s.pipelineStage === "Lost/未中标") {
    s.status = "Lost/未中标";
  }
  s.type = isConfirmedShipment(s) ? "Shipment" : "Inquiry";
  if (s.type === "Shipment" && !s.customerConfirmDate) s.customerConfirmDate = todayISO();
  s.owner = document.getElementById("progressOwner").value;
  s.priority = document.getElementById("progressPriority").value;
  s.plate = document.getElementById("progressPlate").value;
  s.driver = document.getElementById("progressDriver").value;
  s.driverPhone = document.getElementById("progressDriverPhone").value;
  s.etaPickup = document.getElementById("progressPickupEta").value;
  s.etaDelivery = document.getElementById("progressDeliveryEta").value;
  s.followDue = document.getElementById("progressFollowDue").value;
  s.podStatus = document.getElementById("progressPod").value;
  s.invoiceNo = document.getElementById("progressInvoice").value;
  s.invoiceDue = document.getElementById("progressInvoiceDue").value;
  s.supplierCost = readNumber("progressSupplierCost");
  s.insuranceCost = readNumber("progressInsuranceCost");
  s.cargoValue = readNumber("progressCargoValue");
  s.carrierQuotes = readCarrierQuotes();
  const bestQuote = bestCarrierQuote(s);
  if (bestQuote) {
    s.selectedSupplier = bestQuote.carrier;
    if (!s.supplierCost || bestQuote.price < s.supplierCost) s.supplierCost = Number(bestQuote.price);
  }
  s.totalCost = readNumber("progressTotalCost") || (Number(s.supplierCost || 0) + Number(s.insuranceCost || 0));
  s.customerQuote = readNumber("progressCustomerQuote");
  s.customerTotalQuote = readNumber("progressCustomerTotalQuote") || s.customerQuote;
  s.margin = calcShipmentProfit(s);
  s.arStatus = document.getElementById("progressArStatus").value;
  s.apStatus = document.getElementById("progressApStatus").value;
  s.selectedSupplier = document.getElementById("progressSelectedSupplier").value || s.selectedSupplier;
  s.nextAction = document.getElementById("progressNextAction").value;
  const note = document.getElementById("progressUpdateNote").value.trim();
  s.history = s.history || [];
  s.history.unshift({
    at: new Date().toISOString(),
    owner: s.owner || "Team",
    fromStatus: before.status || "",
    toStatus: s.status || "",
    note: note || `更新状态/下一步：${before.nextAction || "-"} → ${s.nextAction || "-"}`,
  });
  saveState();
  renderProgress();
}

function readNumber(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const value = Number(el.value);
  return Number.isFinite(value) ? value : 0;
}

function calcShipmentProfit(s) {
  const quote = Number(s.customerTotalQuote || s.customerQuote || 0);
  const cost = Number(s.totalCost || s.supplierCost || 0) + Number((s.totalCost ? 0 : s.insuranceCost) || 0);
  return quote > 0 ? quote - cost : 0;
}

function transportQuoteForRatio(s) {
  return Number(s.customerQuote || s.customerTransportQuote || s.customerTotalQuote || 0);
}

function dunextTargetPrice(s) {
  return Number(s.cargoValue || 0) * 0.07;
}

function quoteCargoRatio(s) {
  const cargoValue = Number(s.cargoValue || 0);
  if (!cargoValue) return 0;
  return transportQuoteForRatio(s) / cargoValue;
}

function quoteCargoRatioText(s) {
  const ratio = quoteCargoRatio(s);
  return ratio ? `${(ratio * 100).toFixed(2)}%` : "缺货值或报价";
}

function isDunextShipment(s) {
  return /dunext/i.test(String(s.client || ""));
}

function dunextBargainAdvice(s) {
  if (!isDunextShipment(s)) return "非 Dunext 客户：此规则仅作为参考。";
  const cargoValue = Number(s.cargoValue || 0);
  const quote = transportQuoteForRatio(s);
  if (!cargoValue) return "缺货值，无法判断 7% 规则。请先填写货值。";
  if (!quote) return `货值为 ${money(cargoValue)}，7%目标运输价为 ${money(dunextTargetPrice(s))}。请先填写对客运输报价。`;
  const ratio = quoteCargoRatio(s);
  if (ratio <= 0.07) return `当前运输报价 ${money(quote)}，占货值 ${(ratio * 100).toFixed(2)}%，低于/等于7%，原则上可以不用继续还价。`;
  return `当前运输报价 ${money(quote)}，占货值 ${(ratio * 100).toFixed(2)}%，高于7%。建议继续向车队压价或调整对客报价，目标不高于 ${money(dunextTargetPrice(s))}。`;
}

function validCarrierQuotes(s) {
  return (s.carrierQuotes || []).filter((q) => q.carrier && Number(q.price || 0) > 0);
}

function bestCarrierQuote(s) {
  const quotes = validCarrierQuotes(s);
  if (!quotes.length) return null;
  return quotes.reduce((best, q) => Number(q.price) < Number(best.price) ? q : best, quotes[0]);
}

function carrierQuoteAdvice(s) {
  const best = bestCarrierQuote(s);
  if (!best) return "还没有车队报价。建议至少发3家车队询价。";
  const dunextTarget = dunextTargetPrice(s);
  if (isDunextShipment(s) && Number(s.cargoValue || 0)) {
    if (Number(best.price) <= dunextTarget) {
      return `最低车队报价 ${best.carrier} ${money(best.price)}，低于/等于Dunext 7%目标 ${money(dunextTarget)}，可以作为推荐报价基础。`;
    }
    return `最低车队报价 ${best.carrier} ${money(best.price)}，高于Dunext 7%目标 ${money(dunextTarget)}，建议继续压价。`;
  }
  return `当前最低车队报价：${best.carrier} ${money(best.price)}。`;
}

function carrierQuotesEditor(s) {
  const rows = normalizeCarrierQuotes(s);
  return `<div class="table-wrap"><table>
    <thead><tr><th>#</th><th>车队</th><th>报价</th><th>报价时间</th><th>能否满足提货</th><th>能否满足送货</th><th>状态</th><th>备注/压价记录</th></tr></thead>
    <tbody>${rows.map((q, i) => `<tr>
      <td>${i + 1}</td>
      <td><input id="cqCarrier${i}" value="${escapeAttr(q.carrier || "")}" placeholder="车队名称" /></td>
      <td><input id="cqPrice${i}" type="number" step="0.01" value="${Number(q.price || 0) || ""}" /></td>
      <td><input id="cqTime${i}" type="datetime-local" value="${toDateTimeLocal(q.quoteTime || "")}" /></td>
      <td><select id="cqPickup${i}">${["","可以","不可以","待确认"].map((x) => `<option value="${x}" ${x === (q.canMeetPickup || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></td>
      <td><select id="cqDelivery${i}">${["","可以","不可以","待确认"].map((x) => `<option value="${x}" ${x === (q.canMeetDelivery || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></td>
      <td><select id="cqStatus${i}">${["待报价","已报价","压价中","已选择","未选择"].map((x) => `<option ${x === (q.status || "待报价") ? "selected" : ""}>${x}</option>`).join("")}</select></td>
      <td><input id="cqNote${i}" value="${escapeAttr(q.note || "")}" placeholder="例如：已压价，等待回复" /></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function carrierQuoteSummary(s) {
  const valid = validCarrierQuotes(s);
  const best = bestCarrierQuote(s);
  const totalRows = (s.carrierQuotes || []).filter((q) => q.carrier || q.price || q.note).length;
  if (!valid.length) return badge("待车队报价", "amber");
  const parts = [
    `已报价 ${valid.length}/${Math.max(totalRows, 3)}`,
    best ? `最低 ${best.carrier} ${money(best.price)}` : "",
  ];
  if (isDunextShipment(s) && Number(s.cargoValue || 0) && best) {
    parts.push(Number(best.price) <= dunextTargetPrice(s) ? "低于7%目标" : "高于7%目标");
  }
  return parts.filter(Boolean).join("<br>");
}

function readCarrierQuotes() {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const carrier = document.getElementById(`cqCarrier${i}`)?.value || "";
    const price = readNumber(`cqPrice${i}`);
    const quoteTime = document.getElementById(`cqTime${i}`)?.value || "";
    const canMeetPickup = document.getElementById(`cqPickup${i}`)?.value || "";
    const canMeetDelivery = document.getElementById(`cqDelivery${i}`)?.value || "";
    const status = document.getElementById(`cqStatus${i}`)?.value || "待报价";
    const note = document.getElementById(`cqNote${i}`)?.value || "";
    if (carrier || price || note || status !== "待报价") {
      rows.push({ id: `CQ-${i + 1}`, carrier, price: price || "", quoteTime, canMeetPickup, canMeetDelivery, status, note });
    } else {
      rows.push({ id: `CQ-${i + 1}`, carrier: "", price: "", quoteTime: "", canMeetPickup: "", canMeetDelivery: "", status: "待报价", note: "" });
    }
  }
  return rows;
}

function shipmentMini(s) {
  return `<div class="table-wrap"><table><tbody>
    ${summaryRow("Offer ID", s.id)}
    ${summaryRow("Client", s.client)}
    ${summaryRow("Status", badge(s.status, statusTone(s.status)))}
    ${summaryRow("Route", s.route || [s.pickup, s.delivery].filter(Boolean).join(" → "))}
    ${summaryRow("Supplier", s.selectedSupplier)}
    ${summaryRow("Cost", money(s.supplierCost))}
    ${summaryRow("Customer Quote", money(s.customerQuote || s.customerTotalQuote))}
    ${summaryRow("Cargo Value", money(s.cargoValue))}
    ${summaryRow("Dunext 7% Target", money(dunextTargetPrice(s)))}
    ${summaryRow("Quote/Cargo Ratio", quoteCargoRatioText(s))}
    ${summaryRow("Bargain Advice", dunextBargainAdvice(s))}
    ${summaryRow("POD", s.podStatus)}
    ${summaryRow("Invoice", s.invoiceNo)}
  </tbody></table></div>`;
}

function historyHtml(s) {
  const history = s.history || [];
  if (!history.length) return `<div class="empty">暂无进展历史。保存一次进展后会自动出现。</div>`;
  return history.map((h) => `
    <div class="note-card">
      <strong>${dateText(h.at)} · ${h.owner || "Team"}</strong>
      <p>${h.fromStatus || "-"} → ${h.toStatus || "-"}</p>
      <p>${h.note || ""}</p>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function dateOnly(value) {
  return String(value || "").slice(0, 10);
}

function toDateTimeLocal(value) {
  if (!value) return "";
  const text = String(value).replace(" ", "T");
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(text)) return text.slice(0, 16);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return `${text}T09:00`;
  return "";
}

function calendarHtml(baseDate, tasks, notes) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - ((first.getDay() + 6) % 7));
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = localDateISO(d);
    const dayTasks = tasks.filter((t) => String(t.due).slice(0, 10) === iso);
    const dayNotes = notes.filter((n) => n.date === iso);
    days.push(`
      <div class="day ${d.getMonth() !== month ? "muted" : ""} ${iso === todayISO() ? "today" : ""}">
        <div class="day-num">${d.getDate()}</div>
        ${dayTasks.slice(0, 5).map((t) => `<button class="event event-btn ${t.priority === "高" ? "high" : ""}" data-task="${t.id}" title="来自任务Due Date：${escapeAttr(dateText(t.due))}">${t.offerId} ${t.type}</button>`).join("")}
        ${dayNotes.slice(0, 2).map((n) => `<span class="event tender">${n.owner}: ${n.text.slice(0, 18)}</span>`).join("")}
      </div>
    `);
  }
  return `
    <div class="calendar-head">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => `<div>${d}</div>`).join("")}</div>
    <div class="calendar-grid">${days.join("")}</div>
  `;
}

function notesHtml() {
  if (!state.notes.length) return `<div class="empty">暂无留言</div>`;
  return state.notes.map((n) => `
    <div class="note-card">
      <strong>${n.date} · ${n.owner}</strong>
      <p>${n.text}</p>
      <div class="toolbar" style="margin:10px 0 0">
        <button class="small ghost edit-note-btn" data-note="${n.id}">编辑</button>
        <button class="small ghost delete-note-btn" data-note="${n.id}">删除</button>
      </div>
    </div>
  `).join("");
}

function taskTable(tasks) {
  if (!tasks.length) return `<div class="empty">暂无任务</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Due</th><th>Offer</th><th>类型</th><th>事项</th><th>Owner</th><th>状态</th><th>优先级</th><th>操作</th></tr></thead>
    <tbody>${tasks.map((t) => `<tr>
      <td>${dateText(t.due)}</td><td>${t.offerId}</td><td>${t.type}</td><td>${t.text}</td><td>${t.owner}</td>
      <td>${badge(t.status, statusTone(t.status))}</td><td>${badge(t.priority, t.priority === "高" ? "red" : "amber")}</td><td><button class="small edit-task-btn" data-task="${t.id}">编辑</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function renderShipments() {
  const el = document.getElementById("view-shipments");
  const lineCount = (state.shipmentLines || []).length;
  const filters = getShipmentFilters();
  const filteredShipments = applyShipmentFilters(state.shipments, filters);
  const filteredLines = applyLineFilters(state.shipmentLines || [], filters);
  const inquiries = state.shipments.filter((s) => recordKind(s) === "Inquiry");
  const confirmed = state.shipments.filter(isConfirmedShipment);
  const inTransit = state.shipments.filter(isInTransitShipment);
  const revenue = state.shipments.reduce((sum, s) => sum + Number(s.customerTotalQuote || s.customerQuote || 0), 0);
  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("Open Inquiry", inquiries.length, "未成交/待报价", "amber")}
      ${kpi("Shipment总数", confirmed.length, "客户已确认", "green")}
      ${kpi("在途Shipments", inTransit.length, "待提货/运输中", "teal")}
      ${kpi("收入/利润", `${money(revenue) || "-"} / ${money(estimateProfit()) || "-"}`, "AR Quote / Profit", "purple")}
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>高级筛选</h3>
      <div class="toolbar">
        <input id="shipmentFilter" placeholder="Offer ID / 客户 / PO / 地址 / Next Action" value="${escapeAttr(filters.q)}" />
        <select id="shipmentStatusFilter"><option value="">全部状态</option>${uniqueOptions(state.shipments.map(s => s.status), filters.status)}</select>
        <select id="shipmentStageFilter"><option value="">全部阶段</option>${pipelineStages().map((x) => `<option ${x === filters.stage ? "selected" : ""}>${x}</option>`).join("")}</select>
        <select id="shipmentClientFilter"><option value="">全部客户</option>${uniqueOptions(state.shipments.map(s => s.client), filters.client)}</select>
        <select id="shipmentPriorityFilter"><option value="">全部优先级</option>${uniqueOptions(state.shipments.map(s => s.priority), filters.priority)}</select>
        <select id="shipmentViewFilter">
          ${[
            ["all","全部"],
            ["quote","Open Inquiry/待报价"],
            ["follow","需要跟进"],
            ["transit","在途"],
            ["pod","待POD"],
            ["invoice","待开票/回款"],
            ["lost","Lost/未中标"],
            ["risk","风险/缺信息"],
          ].map(([value,label]) => `<option value="${value}" ${filters.view === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </div>
      <div class="toolbar">
        <button class="small quick-filter" data-view="quote">只看Open Inquiry</button>
        <button class="small quick-filter" data-view="follow">只看需跟进</button>
        <button class="small quick-filter" data-view="transit">只看在途</button>
        <button class="small quick-filter" data-view="invoice">只看待开票/回款</button>
        <button class="small ghost quick-filter" data-view="all">清空视图筛选</button>
      </div>
    </div>
    <div class="toolbar">
      <button id="addManualBtn" class="ghost">新增空白 Inquiry</button>
    </div>
    <div class="panel">
      <h3>Inquiry / Shipment 工作台</h3>
      <p class="panel-sub">这里是主清单：每天收到的询价先是 Inquiry；客户确认给我们做之后才变成 Shipment。</p>
      ${shipmentTable(filteredShipments)}
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>Excel 全部明细行</h3>
      <p class="panel-sub">这里保留 Excel 的每一行，包含一票多 PO / 多派送地址，避免主票聚合后看起来像数据丢失。</p>
      ${shipmentLineTable(filteredLines)}
    </div>
  `;
  ["shipmentFilter","shipmentStatusFilter","shipmentStageFilter","shipmentClientFilter","shipmentPriorityFilter","shipmentViewFilter"].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.oninput = saveShipmentFiltersAndRender;
    if (node) node.onchange = saveShipmentFiltersAndRender;
  });
  document.querySelectorAll(".quick-filter").forEach((btn) => {
    btn.onclick = () => {
      const current = getShipmentFilters();
      current.view = btn.dataset.view;
      saveShipmentFilters(current);
      renderShipments();
    };
  });
  document.getElementById("addManualBtn").onclick = () => {
    const id = nextManualOfferId();
    state.shipments.unshift({ id, type: "Inquiry", client: "", status: "Inquiry - 待核对", pipelineStage: "Inquiry", requestDate: todayISO(), nextAction: "补充客户需求信息并发供应商询价", owner: "Team", priority: "中" });
    saveState();
    sessionStorage.setItem("selectedOfferId", id);
    sessionStorage.setItem("progressSearch", id);
    showView("progress");
  };
}

function nextManualOfferId() {
  const prefix = "CTSHU-ROAD-MANUAL-";
  const used = new Set(state.shipments.map((s) => s.id));
  let n = state.shipments.length + 1;
  let id = `${prefix}${String(n).padStart(3, "0")}`;
  while (used.has(id)) {
    n += 1;
    id = `${prefix}${String(n).padStart(3, "0")}`;
  }
  return id;
}

function shipmentLineTable(lines) {
  if (!lines.length) return `<div class="empty">暂无明细行</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Excel行</th><th>Offer ID</th><th>Client</th><th>状态</th><th>PO/Code</th><th>派送地址</th><th>ETA</th><th>车牌/司机</th><th>报价/成本</th><th>AR/AP</th><th>Next Action</th><th>操作</th></tr></thead>
    <tbody>${lines.map((l) => {
      const ar = arDisplayForOffer(l.offerId);
      return `<tr>
      <td>${l.excelRow}</td>
      <td><strong>${l.offerId || "-"}</strong></td>
      <td>${l.client || "-"}</td>
      <td>${badge(l.status || "-", statusTone(l.status))}</td>
      <td>${l.po || l.clientRef || "-"}</td>
      <td>${l.deliveryAddress || l.delivery || "-"}</td>
      <td>${[l.pickupEta && `PU ${l.pickupEta}`, l.deliveryEta && `DEL ${l.deliveryEta}`].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[l.plate, l.driver, l.driverPhone].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[l.selectedFleet, l.transportCost && `Cost ${money(l.transportCost)}`, l.customerTotalQuote && `Quote ${money(l.customerTotalQuote)}`].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[ar.text !== "-" ? ar.text : "", l.apStatus && `AP ${l.apStatus}`].filter(Boolean).join("<br>") || "-"}</td>
      <td>${l.nextAction || "-"}</td>
      <td><button class="small edit-line-btn" data-row="${l.excelRow}">编辑行</button></td>
    </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function getShipmentFilters() {
  try {
    return { q: "", status: "", stage: "", client: "", priority: "", view: "all", ...JSON.parse(sessionStorage.getItem("shipmentFilters") || "{}") };
  } catch {
    return { q: "", status: "", stage: "", client: "", priority: "", view: "all" };
  }
}

function saveShipmentFilters(filters) {
  sessionStorage.setItem("shipmentFilters", JSON.stringify({
    q: filters.q || "",
    status: filters.status || "",
    stage: filters.stage || "",
    client: filters.client || "",
    priority: filters.priority || "",
    view: filters.view || "all",
  }));
}

function saveShipmentFiltersAndRender() {
  saveShipmentFilters({
    q: document.getElementById("shipmentFilter")?.value || "",
    status: document.getElementById("shipmentStatusFilter")?.value || "",
    stage: document.getElementById("shipmentStageFilter")?.value || "",
    client: document.getElementById("shipmentClientFilter")?.value || "",
    priority: document.getElementById("shipmentPriorityFilter")?.value || "",
    view: document.getElementById("shipmentViewFilter")?.value || "all",
  });
  renderShipments();
}

function uniqueOptions(values, selected) {
  return [...new Set(values.filter(Boolean))].sort().map((value) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${value}</option>`).join("");
}

function applyShipmentFilters(shipments, filters = {}) {
  const q = String(filters.q || "").toLowerCase();
  return shipments.filter((s) => {
    const lines = linesForOffer(s.id);
    if (filters.status && s.status !== filters.status) return false;
    if (filters.stage && (s.pipelineStage || inferPipelineStage(s)) !== filters.stage) return false;
    if (filters.client && s.client !== filters.client) return false;
    if (filters.priority && s.priority !== filters.priority) return false;
    if (q && !JSON.stringify({ s, lines }).toLowerCase().includes(q)) return false;
    return matchShipmentView(s, filters.view || "all");
  });
}

function applyLineFilters(lines, filters = {}) {
  const allowedOffers = new Set(applyShipmentFilters(state.shipments, filters).map((s) => s.id));
  const q = String(filters.q || "").toLowerCase();
  return lines.filter((line) => {
    if (!allowedOffers.has(line.offerId)) return false;
    if (q && !JSON.stringify(line).toLowerCase().includes(q) && !String(line.offerId || "").toLowerCase().includes(q)) return false;
    return true;
  });
}

function matchShipmentView(s, view) {
  if (!view || view === "all") return true;
  if (view === "quote") return recordKind(s) === "Inquiry";
  if (view === "follow") return needsFollowUp(s);
  if (view === "transit") return isInTransitShipment(s);
  if (view === "pod") return /POD/.test(s.status || s.podStatus || "");
  if (view === "invoice") return /开票|回款/.test(s.status || s.arStatus || "");
  if (view === "lost") return (s.pipelineStage || inferPipelineStage(s)) === "Lost/未中标";
  if (view === "risk") return shipmentRisks(s).length > 0;
  return true;
}

function needsQuote(s) {
  return /询价|报价|压价|供应商/.test([s.status, s.quoteStatus, s.nextAction].filter(Boolean).join(" "));
}

function needsFollowUp(s) {
  return Boolean(s.nextAction || s.followDue || (state.tasks || []).some((t) => t.offerId === s.id && t.status !== "已完成"));
}

function shipmentRisks(s) {
  const risks = [];
  if ((s.pipelineStage || inferPipelineStage(s)) === "Lost/未中标") {
    if (!s.lostReason) risks.push("Lost缺原因");
    return risks;
  }
  if (needsQuote(s) && !Number(s.customerTotalQuote || s.customerQuote || 0)) risks.push("缺对客报价");
  if (needsQuote(s) && !Number(s.totalCost || s.supplierCost || 0)) risks.push("缺供应商成本");
  if (isDunextShipment(s) && needsQuote(s)) {
    if (Number(s.cargoValue || 0) && transportQuoteForRatio(s) && quoteCargoRatio(s) > 0.07) risks.push("Dunext高于7%需压价");
    else if (bestCarrierQuote(s) && Number(bestCarrierQuote(s).price) > dunextTargetPrice(s)) risks.push("最低车队价高于7%目标");
  }
  if (/在途/.test(s.status || "") && !s.plate) risks.push("在途缺车牌");
  if (/在途/.test(s.status || "") && !s.driverPhone) risks.push("在途缺司机电话");
  if (/POD/.test(s.status || "") && !s.podStatus) risks.push("缺POD状态");
  if (/回款/.test(s.status || "") && !s.invoiceNo) risks.push("待回款缺Invoice");
  if (!s.nextAction && !/运输完成/.test(s.status || "")) risks.push("缺Next Action");
  return risks;
}

function shipmentTable(items) {
  if (!items.length) return `<div class="empty">暂无记录</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Offer ID</th><th>类型</th><th>客户</th><th>状态</th><th>需要关注</th><th>PO/派送</th><th>报价/成本/利润</th><th>AR/POD</th><th>路线</th><th>日期</th><th>下一步</th><th>操作</th></tr></thead>
    <tbody>${items.map((s) => {
      const risks = shipmentRisks(s);
      const lineCount = linesForOffer(s.id).length;
      const quote = Number(s.customerTotalQuote || s.customerQuote || 0);
      const cost = Number(s.totalCost || s.supplierCost || 0);
      const profit = calcShipmentProfit(s);
      return `<tr>
      <td><strong>${s.id}</strong></td><td>${badge(recordKind(s), recordKind(s) === "Shipment" ? "green" : "amber")}</td>
      <td>${s.client || "-"}</td><td>${badge(s.pipelineStage || inferPipelineStage(s), (s.pipelineStage === "Lost/未中标" ? "red" : "teal"))}<br>${badge(s.status, statusTone(s.status))}</td>
      <td>${risks.length ? risks.map((r) => badge(r, "red")).join("<br>") : badge("OK", "green")}</td>
      <td>${lineCount || "-"} 行</td>
      <td>${[quote && `AR/Quote ${money(quote)}`, cost && `AP/Cost ${money(cost)}`, `Profit ${money(profit)}`].filter(Boolean).join("<br>")}</td>
      <td>${[s.invoiceNo && `Inv ${s.invoiceNo}`, s.arStatus && `AR ${s.arStatus}`, s.apStatus && `AP ${s.apStatus}`, s.podStatus && `POD ${s.podStatus}`].filter(Boolean).join("<br>") || "-"}</td>
      <td>${s.route || [s.pickup, s.delivery].filter(Boolean).join(" → ") || "-"}</td>
      <td>${[recordDate(s) && `Inquiry ${recordDate(s)}`, confirmedDate(s) && isConfirmedShipment(s) && `Confirm ${confirmedDate(s)}`, s.followDue && dateText(s.followDue)].filter(Boolean).join("<br>") || "-"}</td>
      <td>${s.nextAction || "-"}</td>
      <td>
        <button class="small update-progress-btn" data-offer="${escapeAttr(s.id)}">${recordKind(s) === "Inquiry" ? "更新Inquiry" : "更新Shipment"}</button>
        <button class="small ghost delete-shipment-btn" data-offer="${escapeAttr(s.id)}">删除</button>
      </td>
    </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function deleteShipmentById(offerId) {
  const shipment = state.shipments.find((s) => s.id === offerId);
  if (!shipment) return;
  const lineCount = (state.shipmentLines || []).filter((line) => line.offerId === offerId).length;
  const taskCount = (state.tasks || []).filter((taskItem) => taskItem.offerId === offerId).length;
  const arCount = (state.ar || []).filter((record) => record.offerId === offerId).length;
  const details = [
    `${shipment.id} / ${shipment.client || "-"}`,
    lineCount ? `同时删除 ${lineCount} 条PO/派送明细` : "",
    taskCount ? `同时删除 ${taskCount} 条相关任务` : "",
    arCount ? `同时删除 ${arCount} 条AR记录` : "",
  ].filter(Boolean).join("\n");
  if (!confirm(`确定删除这票记录吗？\n\n${details}\n\n删除后会同步到Google Sheets。`)) return;
  state.shipments = state.shipments.filter((s) => s.id !== offerId);
  state.shipmentLines = (state.shipmentLines || []).filter((line) => line.offerId !== offerId);
  state.tasks = (state.tasks || []).filter((taskItem) => taskItem.offerId !== offerId);
  state.ar = (state.ar || []).filter((record) => record.offerId !== offerId);
  if (sessionStorage.getItem("selectedOfferId") === offerId) sessionStorage.removeItem("selectedOfferId");
  if (sessionStorage.getItem("progressSearch") === offerId) sessionStorage.removeItem("progressSearch");
  if (sessionStorage.getItem("searchOfferId") === offerId) sessionStorage.removeItem("searchOfferId");
  saveState();
  renderNav();
  renderShipments();
}

function renderRfq() {
  const el = document.getElementById("view-rfq");
  const rows = state.shipments.flatMap((s) => (s.routes || []).map((r) => ({ shipment: s, route: r })));
  const quoteItems = state.shipments.filter((s) => needsQuote(s) || validCarrierQuotes(s).length || Number(s.customerTotalQuote || s.customerQuote || s.supplierCost || s.totalCost || 0));
  const totalQuote = quoteItems.reduce((sum, s) => sum + Number(s.customerTotalQuote || s.customerQuote || 0), 0);
  const totalCost = quoteItems.reduce((sum, s) => sum + Number(s.totalCost || s.supplierCost || 0), 0);
  const totalProfit = quoteItems.reduce((sum, s) => sum + calcShipmentProfit(s), 0);
  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("报价/成本票数", quoteItems.length, "有报价、成本或需报价", "purple")}
      ${kpi("AR / Quote", money(totalQuote), "对客报价/应收", "green")}
      ${kpi("AP / Cost", money(totalCost), "供应商成本/应付", "amber")}
      ${kpi("Profit / Margin", `${money(totalProfit)} / ${totalQuote ? ((totalProfit / totalQuote) * 100).toFixed(1) : "-"}%`, "利润和毛利率", "teal")}
    </div>
    <div class="panel">
      <h3>报价 / AP / AR / Profit 中心</h3>
      <p class="panel-sub">这个页面的作用：集中看每票对客报价 AR、供应商成本 AP、利润 Profit、毛利率 Margin、最低车队报价和报价判断。不是必须三家车队报价，有几家就记录几家。</p>
      ${quoteProfitTable(quoteItems)}
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>Tender 路线报价分析</h3>
      <p class="panel-sub">只有多路线 tender 才会用到这里：每条路线看客户目标价、供应商报价、最低价、建议对客报价和利润空间。</p>
      ${rfqTable(rows)}
    </div>
  `;
}

function quoteProfitTable(items) {
  if (!items.length) return `<div class="empty">暂无需要报价或已有报价/成本的 shipment。</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Offer</th><th>Client</th><th>阶段/状态</th><th>Best Carrier</th><th>AR / Quote</th><th>AP / Cost</th><th>Profit</th><th>Margin</th><th>Dunext 7%</th><th>AR/AP状态</th><th>Next Action</th><th>操作</th></tr></thead>
    <tbody>${items.map((s) => {
      const quote = Number(s.customerTotalQuote || s.customerQuote || 0);
      const cost = Number(s.totalCost || s.supplierCost || 0);
      const profit = calcShipmentProfit(s);
      const best = bestCarrierQuote(s);
      return `<tr>
        <td><strong>${s.id}</strong></td>
        <td>${s.client || "-"}</td>
        <td>${badge(s.pipelineStage || inferPipelineStage(s), "teal")}<br>${badge(s.status, statusTone(s.status))}</td>
        <td>${best ? `${escapeHtml(best.carrier || "-")}<br>${money(best.price)}` : "-"}</td>
        <td>${money(quote) || "-"}</td>
        <td>${money(cost) || "-"}</td>
        <td>${money(profit) || "-"}</td>
        <td>${marginText(s)}</td>
        <td>${s.cargoValue ? `7% ${money(dunextTargetPrice(s))}<br>${quoteCargoRatioText(s)}` : "-"}</td>
        <td>${[s.arStatus && `AR ${s.arStatus}`, s.apStatus && `AP ${s.apStatus}`, s.invoiceNo && `Inv ${s.invoiceNo}`].filter(Boolean).join("<br>") || "-"}</td>
        <td>${s.nextAction || "-"}</td>
        <td><button class="small update-progress-btn" data-offer="${escapeAttr(s.id)}">更新报价</button></td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function rfqTable(rows) {
  if (!rows.length) return `<div class="empty">暂无 Tender 路线。可以先到邮件识别中心生成。</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Offer</th><th>Route</th><th>Tons</th><th>Client Target</th><th>Supplier Quotes</th><th>Best</th><th>判断</th><th>建议对客报价</th><th>预计利润</th></tr></thead>
    <tbody>${rows.map(({ shipment, route: r }) => {
      const best = bestPrice(r);
      const judge = !best ? "等待供应商报价" : best > Number(r.target) ? "需压价/可能高于目标" : "可报价";
      const suggested = best ? Math.max(Number(r.target) + 60, best + 60) : "";
      const profit = suggested && best ? suggested - best : 0;
      return `<tr>
        <td>${shipment.id}</td><td>${r.unloading}</td><td>${r.tons || "-"}</td><td>${money(r.target)}</td>
        <td>${(r.suppliers || []).map((s, idx) => `${s.name || `Supplier ${idx + 1}`}: ${money(s.price) || "-"}`).join("<br>") || "-"}</td>
        <td>${money(best) || "-"}</td><td>${badge(judge, judge === "可报价" ? "green" : "amber")}</td><td>${money(suggested) || "-"}</td><td>${money(profit) || "-"}</td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function bestPrice(route) {
  const values = (route.suppliers || []).map((s) => Number(s.price)).filter(Boolean);
  return values.length ? Math.min(...values) : 0;
}

function bestSupplier(route) {
  const best = bestPrice(route);
  return (route.suppliers || []).find((s) => Number(s.price) === best)?.name || "";
}

function routesTable(routes) {
  return `<div class="table-wrap"><table>
    <thead><tr><th>ID</th><th>Loading</th><th>Unloading</th><th>Country</th><th>Mode</th><th>Period</th><th>Frequency</th><th>Tons</th><th>Target</th></tr></thead>
    <tbody>${routes.map((r) => `<tr><td>${r.id}</td><td>${r.loading}</td><td>${r.unloading}</td><td>${r.country}</td><td>${r.mode}</td><td>${r.period}</td><td>${r.frequency || "-"}</td><td>${r.tons || "-"}</td><td>${money(r.target)}</td></tr>`).join("")}</tbody>
  </table></div>`;
}

function renderSearch() {
  const el = document.getElementById("view-search");
  const defaultOffer = sessionStorage.getItem("searchOfferId") || "CTSHU-ROAD-2606-22";
  el.innerHTML = `
    <div class="panel">
      <h3>Shipment 查询</h3>
      <div class="toolbar"><input id="searchInput" placeholder="输入 Offer ID，例如 CTSHU-ROAD-2606-22" value="${escapeAttr(defaultOffer)}" /></div>
      <div id="searchResult"></div>
    </div>
  `;
  const input = document.getElementById("searchInput");
  const doSearch = () => {
    const q = input.value.trim().toLowerCase();
    const s = state.shipments.find((x) => x.id.toLowerCase() === q || x.id.toLowerCase().includes(q));
    document.getElementById("searchResult").innerHTML = s ? shipmentDetail(s) : `<div class="empty">没有找到</div>`;
  };
  input.oninput = doSearch;
  doSearch();
}

function shipmentDetail(s) {
  const relatedTasks = state.tasks.filter((t) => t.offerId === s.id);
  const relatedAr = state.ar.filter((a) => a.offerId === s.id);
  const relatedLines = (state.shipmentLines || []).filter((line) => line.offerId === s.id);
  return `
    <div class="grid cols-3">
      ${kpi("状态", s.status || "-", "当前主状态", statusTone(s.status))}
      ${kpi("客户", s.client || "-", "Client", "teal")}
      ${kpi("类型", recordKind(s), "Inquiry / Shipment", recordKind(s) === "Shipment" ? "green" : "amber")}
    </div>
    <div class="grid cols-2" style="margin-top:16px">
      <div class="panel"><h3>关键资料</h3><div class="table-wrap"><table><tbody>
        ${summaryRow("Offer ID", s.id)}
        ${summaryRow("Route", s.route)}
        ${summaryRow("Pickup", s.pickup)}
        ${summaryRow("Delivery", s.delivery)}
        ${summaryRow("Cargo", s.cargo)}
        ${summaryRow("Truck", s.truck)}
        ${summaryRow("Target Rule", s.targetRule)}
        ${summaryRow("Next Action", s.nextAction)}
      </tbody></table></div></div>
      <div class="panel"><h3>相关任务</h3>${taskTable(relatedTasks)}</div>
      <div class="panel"><h3>Excel明细行 / PO派送节点</h3>${relatedLines.length ? shipmentLineTable(relatedLines) : (s.routes?.length ? routesTable(s.routes) : `<div class="empty">单票或尚未拆分路线</div>`)}</div>
      <div class="panel"><h3>AR / Invoice</h3>${arTable(relatedAr)}</div>
    </div>
  `;
}

function renderAr() {
  const el = document.getElementById("view-ar");
  const selectedIndex = Number(sessionStorage.getItem("selectedArIndex") || -1);
  const selected = state.ar[selectedIndex] || null;
  el.innerHTML = `
    <div class="grid cols-3">
      ${kpi("Open AR", state.ar.filter(a => a.status !== "已回款").length, "未回款票数", "amber")}
      ${kpi("Overdue", state.ar.filter(a => arDisplay(a).status === "逾期").length, "已超过due date", "red")}
      ${kpi("AR Amount", money(state.ar.reduce((sum, a) => sum + Number(a.amount || 0), 0)), "总金额", "green")}
    </div>
    <div class="split" style="margin-top:16px">
      <div class="panel">
        <h3>AR / Invoice List</h3>
        <p class="panel-sub">点击编辑后在右侧表单维护 Invoice、Due Date、AR状态、Next Action，不再弹窗。</p>
        ${arTable(state.ar)}
      </div>
      <div class="panel">
        <h3>${selected ? "编辑 AR / Invoice" : "AR编辑面板"}</h3>
        ${selected ? arEditForm(selectedIndex, selected) : `<div class="empty">请先在左侧列表点击“编辑AR”。</div>`}
      </div>
    </div>
  `;
  const saveAr = document.getElementById("saveArBtn");
  if (saveAr) saveAr.onclick = saveArForm;
  const clearAr = document.getElementById("clearArSelectionBtn");
  if (clearAr) clearAr.onclick = () => {
    sessionStorage.removeItem("selectedArIndex");
    renderAr();
  };
}

function arTable(rows) {
  if (!rows.length) return `<div class="empty">暂无 AR 记录</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Invoice</th><th>Offer</th><th>Client</th><th>Amount</th><th>Due</th><th>Days</th><th>Status</th><th>Next Action</th><th>操作</th></tr></thead>
    <tbody>${rows.map((a) => {
      const ar = arDisplay(a);
      const idx = state.ar.indexOf(a);
      return `<tr><td>${a.invoice || "-"}</td><td>${a.offerId || "-"}</td><td>${a.client || "-"}</td><td>${money(a.amount)}</td><td>${ar.due || "-"}</td><td>${ar.dayText || "-"}</td><td>${badge(ar.status, ar.tone)}</td><td>${a.nextAction || "-"}</td><td><button class="small edit-ar-btn" data-index="${idx}">编辑AR</button></td></tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function arEditForm(index, record) {
  return `
    <input type="hidden" id="arIndex" value="${index}" />
    <div class="form-row">
      <label>Invoice No<input id="arInvoice" value="${escapeAttr(record.invoice || "")}" /></label>
      <label>Offer ID<input id="arOfferId" list="shipmentIdListAr" value="${escapeAttr(record.offerId || "")}" /></label>
      <datalist id="shipmentIdListAr">${state.shipments.map((s) => `<option value="${escapeAttr(s.id)}">${escapeAttr(s.client || "")}</option>`).join("")}</datalist>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>Client<input id="arClient" value="${escapeAttr(record.client || "")}" /></label>
      <label>AR Amount<input id="arAmount" type="number" step="0.01" value="${Number(record.amount || 0) || ""}" /></label>
      <label>Invoice Due<input id="arDue" type="date" value="${dateOnly(normalizeDateDisplay(record.due))}" /></label>
    </div>
    <div class="form-row" style="margin-top:12px">
      <label>AR状态<select id="arStatus">${["未回收","部分回收","已回款","待开票","PI已发待确认","争议中"].map((x) => `<option ${x === (record.status || "未回收") ? "selected" : ""}>${x}</option>`).join("")}</select></label>
      <label>Next Action<input id="arNextAction" value="${escapeAttr(record.nextAction || "")}" /></label>
    </div>
    <label style="display:block;margin-top:12px">备注<textarea id="arRemarks" style="min-height:90px">${escapeHtml(record.remarks || "")}</textarea></label>
    <div class="toolbar" style="margin-top:12px">
      <button id="saveArBtn">保存AR</button>
      <button id="clearArSelectionBtn" class="ghost">取消选择</button>
    </div>
  `;
}

function saveArForm() {
  const index = Number(document.getElementById("arIndex").value);
  const record = state.ar[index];
  if (!record) return;
  record.invoice = document.getElementById("arInvoice").value.trim();
  record.offerId = document.getElementById("arOfferId").value.trim();
  record.client = document.getElementById("arClient").value.trim();
  record.amount = readNumber("arAmount");
  record.due = document.getElementById("arDue").value;
  record.status = document.getElementById("arStatus").value;
  record.nextAction = document.getElementById("arNextAction").value.trim();
  record.remarks = document.getElementById("arRemarks").value.trim();
  syncArToShipment(record);
  saveState();
  renderAr();
}

function renderHelp() {
  const el = document.getElementById("view-help");
  el.innerHTML = `
    <div class="grid cols-2">
      <div class="panel">
        <h3>今日关注 vs 同事跟进任务</h3>
        <p><strong>今日关注</strong> 是今天打开系统第一眼看的页面：日历、今天到期、逾期、重点事项、团队留言。</p>
        <p><strong>同事跟进任务</strong> 不是单独给你看的“又一个表”，而是所有任务的数据池。今日关注、Dashboard、Shipment查询都会从这里抓任务。</p>
      </div>
      <div class="panel">
        <h3>原始粘贴识别 vs 邮件识别中心</h3>
        <p><strong>原始粘贴识别</strong> 在 Excel 里更像固定字段模板，适合结构化粘贴。</p>
        <p><strong>邮件识别中心</strong> 是网页系统的入口，允许整封邮件、隐藏引用、多语言、缺字段。它会识别能识别的，并清楚标记哪些要人工核对。</p>
      </div>
      <div class="panel">
        <h3>Tender路线报价分析的意义</h3>
        <p>如果一封邮件里有多条路线，它不是一票 shipment。每条路线都可能有不同目标价、重量、供应商成本和利润空间。</p>
        <p>这个模块用来回答：三家供应商谁最低？是否高于客户目标？应该压哪条路线？对客报价至少要多少才能保留利润？</p>
      </div>
      <div class="panel">
        <h3>为什么不用一个页面装所有东西</h3>
        <p>入口、执行、日历、分析、查询是不同动作。混在一个表里就会回到 Excel 的问题：看起来都有，真正用的时候还是乱。</p>
        <p>网页系统把它们拆开，但数据是同一套，所以不会重复录入。</p>
      </div>
    </div>
  `;
}

document.getElementById("seedBtn").onclick = () => {
  if (!confirm("会覆盖当前浏览器里的本地数据，并重新加载 Excel 导入数据，确定吗？")) return;
  state = importInitialData();
  saveState();
  renderAll();
};

document.getElementById("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `road-freight-data-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

function toggleLanguage() {
  localStorage.setItem(LANG_KEY, lang() === "en" ? "zh" : "en");
  renderNav();
  showView(currentView);
}

function renderProgress() {
  const el = document.getElementById("view-progress");
  const q = sessionStorage.getItem("progressSearch") || "";
  const selectedId = sessionStorage.getItem("selectedOfferId") || state.shipments[0]?.id || "";
  const shipment = state.shipments.find((s) => s.id === selectedId) || null;
  const matches = filterShipments(q);
  const lines = shipment ? linesForOffer(shipment.id) : [];
  const selectedRow = Number(sessionStorage.getItem("selectedLineRow") || 0);
  const selectedLine = lines.find((line) => Number(line.excelRow) === selectedRow) || lines[0] || null;

  el.innerHTML = `
    <div class="grid cols-4">
      ${kpi("Offer主票", state.shipments.length, "按Offer ID管理", "purple")}
      ${kpi("Excel明细行", (state.shipmentLines || []).length, "PO/派送点全部保留", "teal")}
      ${kpi("当前票派送点", lines.length, "这车去哪些地方", "amber")}
      ${kpi("预计利润", shipment ? money(calcShipmentProfit(shipment)) : "-", "对客总报价 - 总成本", "green")}
    </div>

    <div class="panel" style="margin-top:16px">
      <h3>搜索 Shipment</h3>
      <p class="panel-sub">输入 Offer ID / 客户 / PO / 派送地址都可以。选中后在下面更新主票、AR/AP、提货/送货地址、派送点和客户PO。</p>
      <div class="toolbar">
        <input id="progressSearch" list="shipmentIdList" placeholder="例如 CTSHU-ROAD-2606-18 / Dunext / PO507 / Bulgaria" value="${escapeAttr(q)}" />
        <datalist id="shipmentIdList">${state.shipments.map((s) => `<option value="${escapeAttr(s.id)}">${escapeAttr(s.client || "")}</option>`).join("")}</datalist>
        <button id="progressSearchBtn">搜索/定位</button>
        <button id="clearProgressSearchBtn" class="ghost">清空</button>
      </div>
      ${q ? searchResultsHtml(matches) : ""}
    </div>

    ${shipment ? `
      <div class="split" style="margin-top:16px">
        <div class="panel">
          <h3>主票信息 / 进展更新</h3>
          ${progressMainForm(shipment)}
        </div>
        <div class="grid">
          <div class="panel">
            <h3>当前票摘要</h3>
            ${shipmentMini(shipment)}
          </div>
          <div class="panel">
            <h3>进展历史</h3>
            ${historyHtml(shipment)}
          </div>
        </div>
      </div>

      <div class="panel" style="margin-top:16px">
        <h3>PO / 派送点 / 地址明细</h3>
        <p class="panel-sub">这里对应你 Excel 里每一行：这车去哪些派送点、对应客人的 PO、提货/送货ETA、到达/卸货/POD情况。</p>
        <div class="toolbar">
          <button id="addStopBtn">新增派送点/PO</button>
          <button id="deleteStopBtn" class="ghost" ${selectedLine ? "" : "disabled"}>删除选中明细</button>
          <button id="deleteCurrentShipmentBtn" class="ghost">删除当前Inquiry/Shipment</button>
        </div>
        ${stopsWorkbenchTable(lines, selectedLine)}
      </div>

      <div class="panel" style="margin-top:16px">
        <h3>${selectedLine ? "编辑选中派送点/PO" : "新增派送点/PO"}</h3>
        ${stopEditForm(selectedLine, shipment)}
      </div>
    ` : `<div class="panel" style="margin-top:16px"><div class="empty">请先搜索并选择一个 Shipment。</div></div>`}
  `;

  document.getElementById("progressSearchBtn").onclick = () => handleProgressSearch();
  document.getElementById("progressSearch").onkeydown = (event) => {
    if (event.key === "Enter") handleProgressSearch();
  };
  document.getElementById("clearProgressSearchBtn").onclick = () => {
    sessionStorage.removeItem("progressSearch");
    renderProgress();
  };
  document.querySelectorAll(".select-shipment-btn").forEach((btn) => {
    btn.onclick = () => {
      sessionStorage.setItem("selectedOfferId", btn.dataset.offer);
      sessionStorage.removeItem("selectedLineRow");
      renderProgress();
    };
  });
  document.querySelectorAll(".select-stop-btn").forEach((btn) => {
    btn.onclick = () => {
      sessionStorage.setItem("selectedLineRow", btn.dataset.row);
      renderProgress();
    };
  });
  const saveMain = document.getElementById("saveProgressBtn");
  if (saveMain && shipment) saveMain.onclick = () => saveProgress(shipment.id);
  const createTask = document.getElementById("createProgressTaskBtn");
  if (createTask && shipment) {
    createTask.onclick = () => {
      const due = document.getElementById("progressFollowDue").value || `${todayISO()}T17:00`;
      const text = document.getElementById("progressNextAction").value || "跟进shipment进展";
      state.tasks.unshift(task(shipment.id, "进展跟进", text, due, document.getElementById("progressOwner").value || "Team", document.getElementById("progressPriority").value || "中"));
      saveState();
      renderProgress();
    };
  }
  const addStop = document.getElementById("addStopBtn");
  if (addStop && shipment) {
    addStop.onclick = () => {
      const line = createEmptyLine(shipment);
      state.shipmentLines.unshift(line);
      sessionStorage.setItem("selectedLineRow", line.excelRow);
      saveState();
      renderProgress();
    };
  }
  const deleteStop = document.getElementById("deleteStopBtn");
  if (deleteStop && selectedLine) deleteStop.onclick = () => deleteShipmentLine(selectedLine.excelRow);
  const deleteCurrentShipment = document.getElementById("deleteCurrentShipmentBtn");
  if (deleteCurrentShipment && shipment) deleteCurrentShipment.onclick = () => deleteShipmentById(shipment.id);
  const saveStop = document.getElementById("saveStopBtn");
  if (saveStop && shipment) saveStop.onclick = () => saveStopForm(shipment.id);
}

function handleProgressSearch() {
  const q = document.getElementById("progressSearch").value.trim();
  sessionStorage.setItem("progressSearch", q);
  const matches = filterShipments(q);
  if (matches.length) {
    sessionStorage.setItem("selectedOfferId", matches[0].id);
    sessionStorage.removeItem("selectedLineRow");
  }
  renderProgress();
}

function filterShipments(query) {
  const q = String(query || "").toLowerCase().trim();
  if (!q) return state.shipments.slice(0, 12);
  return state.shipments.filter((s) => {
    const lines = linesForOffer(s.id);
    return JSON.stringify({ s, lines }).toLowerCase().includes(q);
  });
}

function linesForOffer(offerId) {
  return (state.shipmentLines || []).filter((line) => line.offerId === offerId);
}

function searchResultsHtml(matches) {
  if (!matches.length) return `<div class="empty">没有找到。可以试试只输入数字，比如 2606-18。</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>Offer ID</th><th>Client</th><th>状态</th><th>PO/派送行</th><th>Route</th><th>Next Action</th><th>操作</th></tr></thead>
    <tbody>${matches.slice(0, 20).map((s) => `<tr>
      <td><strong>${s.id}</strong></td>
      <td>${s.client || "-"}</td>
      <td>${badge(s.status || "-", statusTone(s.status))}</td>
      <td>${linesForOffer(s.id).length}</td>
      <td>${s.route || [s.pickup, s.delivery].filter(Boolean).join(" → ") || "-"}</td>
      <td>${s.nextAction || "-"}</td>
      <td><button class="small select-shipment-btn" data-offer="${escapeAttr(s.id)}">选择更新</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function progressMainForm(s) {
  return `
    <div class="form-row three">
      <label>Offer ID<input value="${escapeAttr(s.id)}" disabled /></label>
      <label>Client<input id="progressClient" value="${escapeAttr(s.client || "")}" /></label>
      <label>当前状态
        <select id="progressStatus">${["Inquiry - 待核对","Inquiry - 待供应商报价","Inquiry - 待给客人报价","Inquiry - 待客户确认","已确认待提货","在途","待POD回传","待开票","待回款","运输完成","取消/暂停"].map((x) => `<option ${x === s.status ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>业务阶段
        <select id="progressPipelineStage">${pipelineStages().map((x) => `<option ${x === (s.pipelineStage || inferPipelineStage(s)) ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
      <label>Lost原因
        <select id="progressLostReason"><option value="">未Lost/不适用</option>${lostReasons().map((x) => `<option ${x === (s.lostReason || "") ? "selected" : ""}>${x}</option>`).join("")}</select>
      </label>
      <label>Lost/未中标备注
        <input id="progressLostNote" value="${escapeAttr(s.lostNote || "")}" placeholder="例如：客户目标价太低，车队最低价无法满足" />
      </label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>提货地址<input id="progressPickup" value="${escapeAttr(s.pickup || "")}" /></label>
      <label>送货/路线概述<input id="progressDelivery" value="${escapeAttr(s.delivery || "")}" /></label>
      <label>Route<input id="progressRoute" value="${escapeAttr(s.route || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>负责人<input id="progressOwner" value="${escapeAttr(s.owner || "Team")}" /></label>
      <label>优先级<select id="progressPriority">${["高","中","低"].map((x) => `<option ${x === s.priority ? "selected" : ""}>${x}</option>`).join("")}</select></label>
      <label>供应商/车队<input id="progressSelectedSupplier" value="${escapeAttr(s.selectedSupplier || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>车牌号<input id="progressPlate" value="${escapeAttr(s.plate || "")}" /></label>
      <label>司机<input id="progressDriver" value="${escapeAttr(s.driver || "")}" /></label>
      <label>司机电话<input id="progressDriverPhone" value="${escapeAttr(s.driverPhone || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>提货 ETA<input id="progressPickupEta" type="datetime-local" value="${toDateTimeLocal(s.etaPickup || s.pickupEta || "")}" /></label>
      <label>送货 ETA<input id="progressDeliveryEta" type="datetime-local" value="${toDateTimeLocal(s.etaDelivery || s.deliveryEta || "")}" /></label>
      <label>Follow-up Due<input id="progressFollowDue" type="datetime-local" value="${toDateTimeLocal(s.followDue || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>供应商/AP成本<input id="progressSupplierCost" type="number" step="0.01" value="${Number(s.supplierCost || s.totalCost || 0) || ""}" /></label>
      <label>保险成本<input id="progressInsuranceCost" type="number" step="0.01" value="${Number(s.insuranceCost || 0) || ""}" /></label>
      <label>总成本/AP<input id="progressTotalCost" type="number" step="0.01" value="${Number(s.totalCost || s.supplierCost || 0) || ""}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>货值 / Cargo Value<input id="progressCargoValue" type="number" step="0.01" value="${Number(s.cargoValue || 0) || ""}" /></label>
      <label>Dunext 7%目标运输价<input value="${money(dunextTargetPrice(s))}" disabled /></label>
      <label>运输报价/货值比例<input value="${quoteCargoRatioText(s)}" disabled /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>对客运输报价<input id="progressCustomerQuote" type="number" step="0.01" value="${Number(s.customerQuote || s.customerTransportQuote || 0) || ""}" /></label>
      <label>对客总报价/AR<input id="progressCustomerTotalQuote" type="number" step="0.01" value="${Number(s.customerTotalQuote || s.customerQuote || 0) || ""}" /></label>
      <label>利润自动计算<input value="${money(calcShipmentProfit(s))}" disabled /></label>
    </div>
    <div class="note-card">
      <strong>Dunext报价判断</strong>
      <p>${dunextBargainAdvice(s)}</p>
    </div>
    <div class="note-card">
      <strong>车队报价判断</strong>
      <p>${carrierQuoteAdvice(s)}</p>
    </div>
    <h3 style="margin-top:18px">车队报价</h3>
    <p class="panel-sub">有几家就填几家，不强制3家。系统自动选最低价，并结合Dunext 7%目标判断是否需要压价。</p>
    ${carrierQuotesEditor(s)}
    <div class="form-row three" style="margin-top:12px">
      <label>POD状态<select id="progressPod">${["","待POD回传","已收到POD","已回传客户","无需POD"].map((x) => `<option value="${x}" ${x === (s.podStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></label>
      <label>Invoice No<input id="progressInvoice" value="${escapeAttr(s.invoiceNo || "")}" /></label>
      <label>Invoice Due<input id="progressInvoiceDue" type="date" value="${dateOnly(s.invoiceDue || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>AR状态<select id="progressArStatus">${["","未回收","部分回收","已回款","待开票","PI已发待确认"].map((x) => `<option value="${x}" ${x === (s.arStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></label>
      <label>AP状态<select id="progressApStatus">${["","未收供应商账单","已收供应商账单","已付款","争议中"].map((x) => `<option value="${x}" ${x === (s.apStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></label>
      <label>货物/要求<input id="progressCargoRequirement" value="${escapeAttr(s.cargoRequirement || s.cargo || "")}" /></label>
    </div>
    <label style="display:block;margin-top:12px">Next Action<textarea id="progressNextAction" style="min-height:90px">${escapeHtml(s.nextAction || "")}</textarea></label>
    <label style="display:block;margin-top:12px">本次更新备注<textarea id="progressUpdateNote" style="min-height:70px" placeholder="例如：已确认周一可安排车；等待保险报价；客户目标价需确认。"></textarea></label>
    <div class="toolbar" style="margin-top:12px">
      <button id="saveProgressBtn">保存主票进展</button>
      <button id="createProgressTaskBtn" class="ghost">生成/追加跟进任务</button>
    </div>
  `;
}

function stopsWorkbenchTable(lines, selectedLine) {
  if (!lines.length) return `<div class="empty">这票还没有派送点/PO。点击“新增派送点/PO”添加。</div>`;
  return `<div class="table-wrap"><table>
    <thead><tr><th>选中</th><th>行号</th><th>PO/Code</th><th>派送顺序</th><th>提货地址</th><th>派送地址</th><th>收货联系人</th><th>ETA/实际</th><th>POD/状态</th><th>报价/成本</th></tr></thead>
    <tbody>${lines.map((l) => `<tr>
      <td><button class="small select-stop-btn" data-row="${l.excelRow}">${selectedLine && selectedLine.excelRow === l.excelRow ? "正在编辑" : "编辑"}</button></td>
      <td>${l.excelRow}</td>
      <td><strong>${l.po || l.clientRef || "-"}</strong></td>
      <td>${l.sequence || "-"}</td>
      <td>${l.pickupAddress || l.pickup || "-"}</td>
      <td>${l.deliveryAddress || l.delivery || "-"}</td>
      <td>${[l.receiver, l.receiverPhone].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[l.pickupEta && `PU ${l.pickupEta}`, l.deliveryEta && `DEL ${l.deliveryEta}`, l.actualArrival && `Arr ${l.actualArrival}`, l.unloadFinished && `Unload ${l.unloadFinished}`].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[l.poStatus, l.podStatus].filter(Boolean).join("<br>") || "-"}</td>
      <td>${[l.transportCost && `Cost ${money(l.transportCost)}`, l.customerTotalQuote && `Quote ${money(l.customerTotalQuote)}`].filter(Boolean).join("<br>") || "-"}</td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function stopEditForm(line, shipment) {
  const l = line || createBlankLineObject(shipment);
  return `
    <div class="form-row three">
      <label>Excel行/临时行<input id="stopExcelRow" value="${escapeAttr(l.excelRow || "")}" disabled /></label>
      <label>Offer ID<input id="stopOfferId" value="${escapeAttr(l.offerId || shipment.id)}" disabled /></label>
      <label>PO / 客户Code<input id="stopPo" value="${escapeAttr(l.po || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>派送顺序<input id="stopSequence" value="${escapeAttr(l.sequence || "")}" /></label>
      <label>PO状态<select id="stopPoStatus">${["","待提货","在途","已到达","已卸货","完成","异常"].map((x) => `<option value="${x}" ${x === (l.poStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></label>
      <label>POD状态<select id="stopPodStatus">${["","待POD回传","已收到POD","已回传客户","无需POD"].map((x) => `<option value="${x}" ${x === (l.podStatus || "") ? "selected" : ""}>${x || "未填写"}</option>`).join("")}</select></label>
    </div>
    <label style="display:block;margin-top:12px">提货地址<textarea id="stopPickupAddress" style="min-height:70px">${escapeHtml(l.pickupAddress || l.pickup || shipment.pickup || "")}</textarea></label>
    <label style="display:block;margin-top:12px">派送地址<textarea id="stopDeliveryAddress" style="min-height:90px">${escapeHtml(l.deliveryAddress || l.delivery || "")}</textarea></label>
    <div class="form-row three" style="margin-top:12px">
      <label>收货联系人<input id="stopReceiver" value="${escapeAttr(l.receiver || "")}" /></label>
      <label>收货电话<input id="stopReceiverPhone" value="${escapeAttr(l.receiverPhone || "")}" /></label>
      <label>提货Reference<input id="stopPickupRef" value="${escapeAttr(l.pickupRef || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>提货 ETA<input id="stopPickupEta" value="${escapeAttr(l.pickupEta || "")}" /></label>
      <label>Delivery ETA<input id="stopDeliveryEta" value="${escapeAttr(l.deliveryEta || "")}" /></label>
      <label>实际到达<input id="stopActualArrival" value="${escapeAttr(l.actualArrival || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>卸货完成<input id="stopUnloadFinished" value="${escapeAttr(l.unloadFinished || "")}" /></label>
      <label>车牌<input id="stopPlate" value="${escapeAttr(l.plate || shipment.plate || "")}" /></label>
      <label>司机电话<input id="stopDriverPhone" value="${escapeAttr(l.driverPhone || shipment.driverPhone || "")}" /></label>
    </div>
    <div class="form-row three" style="margin-top:12px">
      <label>供应商/AP成本<input id="stopTransportCost" type="number" step="0.01" value="${Number(l.transportCost || 0) || ""}" /></label>
      <label>对客总报价/AR<input id="stopCustomerTotalQuote" type="number" step="0.01" value="${Number(l.customerTotalQuote || 0) || ""}" /></label>
      <label>Invoice No<input id="stopInvoiceNo" value="${escapeAttr(l.invoiceNo || "")}" /></label>
    </div>
    <label style="display:block;margin-top:12px">备注 / Next Action<textarea id="stopRemarks" style="min-height:80px">${escapeHtml(l.nextAction || l.remarks || "")}</textarea></label>
    <div class="toolbar" style="margin-top:12px">
      <button id="saveStopBtn">${line ? "保存派送点/PO" : "新增派送点/PO"}</button>
    </div>
  `;
}

function createBlankLineObject(shipment) {
  return {
    excelRow: "",
    offerId: shipment.id,
    client: shipment.client,
    status: shipment.status,
    pickup: shipment.pickup,
    delivery: shipment.delivery,
  };
}

function createEmptyLine(shipment) {
  return {
    ...createBlankLineObject(shipment),
    excelRow: nextLineRow(),
    confirm: "已确认",
    rowId: `WEB-${Date.now()}`,
  };
}

function nextLineRow() {
  return Math.max(1000, ...(state.shipmentLines || []).map((line) => Number(line.excelRow || 0))) + 1;
}

function saveStopForm(offerId) {
  const row = Number(document.getElementById("stopExcelRow").value || 0);
  let line = (state.shipmentLines || []).find((item) => Number(item.excelRow) === row);
  const shipment = state.shipments.find((s) => s.id === offerId);
  if (!line) {
    line = createEmptyLine(shipment);
    state.shipmentLines.unshift(line);
  }
  line.offerId = offerId;
  line.client = shipment?.client || line.client;
  line.po = document.getElementById("stopPo").value;
  line.sequence = document.getElementById("stopSequence").value;
  line.poStatus = document.getElementById("stopPoStatus").value;
  line.podStatus = document.getElementById("stopPodStatus").value;
  line.pickupAddress = document.getElementById("stopPickupAddress").value;
  line.deliveryAddress = document.getElementById("stopDeliveryAddress").value;
  line.receiver = document.getElementById("stopReceiver").value;
  line.receiverPhone = document.getElementById("stopReceiverPhone").value;
  line.pickupRef = document.getElementById("stopPickupRef").value;
  line.pickupEta = document.getElementById("stopPickupEta").value;
  line.deliveryEta = document.getElementById("stopDeliveryEta").value;
  line.actualArrival = document.getElementById("stopActualArrival").value;
  line.unloadFinished = document.getElementById("stopUnloadFinished").value;
  line.plate = document.getElementById("stopPlate").value;
  line.driverPhone = document.getElementById("stopDriverPhone").value;
  line.transportCost = readNumber("stopTransportCost");
  line.customerTotalQuote = readNumber("stopCustomerTotalQuote");
  line.invoiceNo = document.getElementById("stopInvoiceNo").value;
  line.nextAction = document.getElementById("stopRemarks").value;
  line.remarks = line.nextAction;
  syncShipmentFromLines(offerId);
  sessionStorage.setItem("selectedLineRow", line.excelRow);
  saveState();
  renderProgress();
}

function deleteShipmentLine(excelRow) {
  const line = (state.shipmentLines || []).find((item) => Number(item.excelRow) === Number(excelRow));
  if (!line) return;
  if (!confirm(`确定删除这条派送点/PO明细吗？\n\n${line.offerId} / ${line.po || ""} / ${line.deliveryAddress || ""}`)) return;
  state.shipmentLines = (state.shipmentLines || []).filter((item) => Number(item.excelRow) !== Number(excelRow));
  sessionStorage.removeItem("selectedLineRow");
  syncShipmentFromLines(line.offerId);
  saveState();
  renderProgress();
}

document.addEventListener("click", (event) => {
  if (event.target.closest("#langToggle")) {
    toggleLanguage();
    return;
  }
  const btn = event.target.closest(".update-progress-btn");
  if (btn) {
    sessionStorage.setItem("selectedOfferId", btn.dataset.offer);
    showView("progress");
    return;
  }
  const deleteShipment = event.target.closest(".delete-shipment-btn");
  if (deleteShipment) {
    deleteShipmentById(deleteShipment.dataset.offer);
    return;
  }
  const editNote = event.target.closest(".edit-note-btn");
  if (editNote) {
    editNoteById(editNote.dataset.note);
    return;
  }
  const deleteNote = event.target.closest(".delete-note-btn");
  if (deleteNote) {
    deleteNoteById(deleteNote.dataset.note);
    return;
  }
  const taskEvent = event.target.closest(".event-btn");
  if (taskEvent) {
    openTaskAction(taskEvent.dataset.task);
    return;
  }
  const editTask = event.target.closest(".edit-task-btn");
  if (editTask) {
    openTaskAction(editTask.dataset.task);
    return;
  }
  const editLine = event.target.closest(".edit-line-btn");
  if (editLine) {
    editShipmentLine(Number(editLine.dataset.row));
    return;
  }
  const editAr = event.target.closest(".edit-ar-btn");
  if (editAr) {
    editArRecord(Number(editAr.dataset.index));
  }
});

function editNoteById(id) {
  const note = state.notes.find((n) => n.id === id);
  if (!note) return;
  sessionStorage.setItem("selectedNoteId", id);
  renderToday();
}

function deleteNoteById(id) {
  const note = state.notes.find((n) => n.id === id);
  if (!note) return;
  if (!confirm(`确定删除这条留言吗？\n\n${note.text}`)) return;
  state.notes = state.notes.filter((n) => n.id !== id);
  saveState();
  renderToday();
}

function openTaskAction(id) {
  const taskItem = state.tasks.find((t) => t.id === id);
  if (!taskItem) return;
  sessionStorage.setItem("selectedTaskId", id);
  renderToday();
}

function editTaskById(id) {
  const taskItem = state.tasks.find((t) => t.id === id);
  if (!taskItem) return;
  sessionStorage.setItem("selectedTaskId", id);
  renderToday();
}

function editShipmentLine(excelRow) {
  const line = (state.shipmentLines || []).find((item) => Number(item.excelRow) === Number(excelRow));
  if (!line) return;
  sessionStorage.setItem("selectedOfferId", line.offerId);
  sessionStorage.setItem("progressSearch", line.offerId);
  sessionStorage.setItem("selectedLineRow", String(line.excelRow));
  showView("progress");
}

function syncShipmentFromLines(offerId) {
  const lines = (state.shipmentLines || []).filter((line) => line.offerId === offerId);
  const s = state.shipments.find((item) => item.id === offerId);
  if (!s || !lines.length) return;
  const first = lines[0];
  s.status = first.status || s.status;
  s.plate = first.plate || s.plate;
  s.driver = first.driver || s.driver;
  s.driverPhone = first.driverPhone || s.driverPhone;
  s.invoiceNo = first.invoiceNo || s.invoiceNo;
  s.invoiceDue = first.invoiceDue || s.invoiceDue;
  const ar = arDisplayForOffer(offerId);
  s.arStatus = ar.status || first.arCollected || s.arStatus;
  s.apStatus = first.apStatus || s.apStatus;
  s.podStatus = first.podStatus || s.podStatus;
  s.nextAction = first.nextAction || s.nextAction;
  const quote = firstNonZero(lines, "customerTotalQuote");
  const cost = firstNonZero(lines, "totalCost") || firstNonZero(lines, "transportCost");
  s.customerTotalQuote = quote || s.customerTotalQuote || 0;
  s.totalCost = cost || s.totalCost || 0;
  s.margin = calcShipmentProfit(s);
}

function firstNonZero(items, key) {
  const found = items.find((item) => Number(item[key] || 0) > 0);
  return found ? Number(found[key]) : 0;
}

function editArRecord(index) {
  const record = state.ar[index];
  if (!record) return;
  sessionStorage.setItem("selectedArIndex", String(index));
  showView("ar");
}

function syncArToShipment(record) {
  const s = state.shipments.find((item) => item.id === record.offerId);
  if (!s) return;
  s.invoiceNo = record.invoice || s.invoiceNo;
  s.invoiceDue = record.due || s.invoiceDue;
  s.arStatus = record.status || s.arStatus;
  s.customerTotalQuote = Number(record.amount || 0) || s.customerTotalQuote;
  s.margin = calcShipmentProfit(s);
}

renderNav();
showView("dashboard");
loadRemoteState();




