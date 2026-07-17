import { useEffect, useMemo, useState } from "react";
import {
  getAllEvents,
  type TrackedEvent,
  type EventName,
} from "../services/eventService";
import { getAllLeads } from "../services/leadService";
import { objetivoLabels, dificuldadeLabels } from "../data/quiz";

type Lead = {
  uid: string;
  name?: string;
  email?: string;
  plano?: string;
  senhaDefinida?: boolean;
  quizAnswers?: Record<string, string> | null;
  createdAt?: { toDate: () => Date };
};

type Tab = "funil" | "leads" | "eventos";

const styles = {
  page: "min-h-dvh bg-slate-950 px-6 py-10",
  container: "max-w-5xl mx-auto",
  title: "text-2xl font-bold text-white mb-1",
  subtitle: "text-slate-500 text-sm mb-8",
  tabs: "flex gap-2 mb-8 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit",
  tab: "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
  tabActive: "bg-amber-400 text-slate-950",
  tabInactive: "text-slate-400 hover:text-white",
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-10",
  card: "bg-white/5 border border-white/10 rounded-2xl p-5",
  number: "text-3xl font-bold text-amber-400",
  label: "text-slate-400 text-xs mt-2",
  tableWrap: "bg-white/5 border border-white/10 rounded-3xl overflow-hidden",
  tableHeader:
    "grid px-5 py-4 text-xs uppercase font-bold text-slate-500 border-b border-white/10",
  row: "grid gap-4 px-5 py-4 border-b border-white/5 last:border-none items-center",
  empty: "text-slate-500 text-center py-10",
  searchInput: "w-full bg-white rounded-2xl px-5 py-4 text-black mb-6",
  exportBtn:
    "bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-3 rounded-xl transition mb-6",
};

const funnelOrder: EventName[] = [
  "quiz_start",
  "quiz_complete",
  "lead_captured",
  "result_view",
  "acesso_view",
  "product_click",
];

const eventLabels: Record<string, string> = {
  quiz_start: "🚀 Iniciou Quiz",
  quiz_complete: "✅ Finalizou Quiz",
  lead_captured: "📩 Capturou Lead",
  result_view: "🎯 Viu Resultado",
  acesso_view: "🔓 Entrou Área",
  product_click: "📦 Clicou em Produto",
  combo_click: "🔥 Clicou no Combo",
  password_defined: "🔑 Criou Senha",
  login: "👤 Login",
};

export default function Admin() {
  const [tab, setTab] = useState<Tab>("funil");
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([getAllEvents(), getAllLeads()])
      .then(([evts, lds]) => {
        setEvents(evts);
        setLeads(lds);
      })
      .catch(() => setError("Erro ao carregar dados."))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    return events.reduce<Record<string, number>>((acc, event) => {
      acc[event.event] = (acc[event.event] ?? 0) + 1;
      return acc;
    }, {});
  }, [events]);

  // Funil com queda relativa entre cada etapa (não só % do início)
  const funnel = useMemo(() => {
    const start = counts.quiz_start ?? leads.length;
    if (start === 0) return [];

    return funnelOrder.map((step, i) => {
      const value =
        counts[step] ?? (step === "lead_captured" ? leads.length : 0);
      const prevValue = i === 0 ? start : (counts[funnelOrder[i - 1]] ?? start);
      const percentOfStart = Math.round((value / start) * 100);
      const retencao =
        prevValue > 0 ? Math.round((value / prevValue) * 100) : 0;

      return { step, value, percentOfStart, retencao, isFirst: i === 0 };
    });
  }, [counts, leads.length]);

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return leads;
    const s = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.name?.toLowerCase().includes(s) || l.email?.toLowerCase().includes(s),
    );
  }, [leads, search]);

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    const s = search.toLowerCase();
    return events.filter((e) => JSON.stringify(e).toLowerCase().includes(s));
  }, [events, search]);

  function exportLeadsCSV() {
    const header = "Nome,Email,Objetivo,Dificuldade,Senha Definida,Data\n";
    const rows = leads
      .map((l) => {
        const objetivo = objetivoLabels[l.quizAnswers?.objetivo ?? ""] ?? "";
        const dificuldade =
          dificuldadeLabels[l.quizAnswers?.dificuldade ?? ""] ?? "";
        const data = l.createdAt?.toDate
          ? l.createdAt.toDate().toLocaleDateString("pt-BR")
          : "";
        return `"${l.name ?? ""}","${l.email ?? ""}","${objetivo}","${dificuldade}","${l.senhaDefinida ? "Sim" : "Não"}","${data}"`;
      })
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <p className="text-slate-400">Carregando dados...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>📊 Painel de Métricas</h1>
        <p className={styles.subtitle}>Funil, leads e eventos do ENEM SaaS</p>

        {/* ABAS */}
        <div className={styles.tabs}>
          {(["funil", "leads", "eventos"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setSearch("");
              }}
              className={`${styles.tab} ${tab === t ? styles.tabActive : styles.tabInactive}`}
            >
              {t === "funil" && "🔻 Funil"}
              {t === "leads" && `👥 Leads (${leads.length})`}
              {t === "eventos" && "📋 Eventos"}
            </button>
          ))}
        </div>

        {/* CARDS RESUMO — sempre visíveis */}
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <p className={styles.number}>{leads.length}</p>
            <p className={styles.label}>Total de leads</p>
          </div>
          <div className={styles.card}>
            <p className={styles.number}>{counts.acesso_view ?? 0}</p>
            <p className={styles.label}>Acessaram o painel</p>
          </div>
          <div className={styles.card}>
            <p className={styles.number}>
              {(counts.product_click ?? 0) + (counts.combo_click ?? 0)}
            </p>
            <p className={styles.label}>Cliques em produtos</p>
          </div>
          <div className={styles.card}>
            <p className={styles.number}>
              {leads.filter((l) => l.senhaDefinida).length}/{leads.length}
            </p>
            <p className={styles.label}>Definiram senha</p>
          </div>
        </div>

        {/* ABA FUNIL */}
        {tab === "funil" && (
          <div className="space-y-4">
            {funnel.map((item, i) => (
              <div key={item.step}>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm font-medium">
                      {eventLabels[item.step]}
                    </span>
                    <span className="text-amber-400 text-sm font-bold">
                      {item.value} · {item.percentOfStart}% do total
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                      style={{ width: `${item.percentOfStart}%` }}
                    />
                  </div>
                </div>

                {!item.isFirst && (
                  <div className="flex justify-center py-1.5">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        item.retencao < 50
                          ? "bg-red-500/15 text-red-400"
                          : "bg-slate-500/15 text-slate-400"
                      }`}
                    >
                      {item.retencao}% seguiu adiante{" "}
                      {item.retencao < 50 ? "⚠️ maior perda aqui" : ""}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ABA LEADS */}
        {tab === "leads" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔎 Buscar por nome ou email..."
                className={`${styles.searchInput} mb-0 flex-1`}
              />
              <button onClick={exportLeadsCSV} className={styles.exportBtn}>
                ⬇️ Exportar CSV
              </button>
            </div>

            <div className={styles.tableWrap}>
              <div
                className={styles.tableHeader}
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
              >
                <span>Nome / Email</span>
                <span>Objetivo</span>
                <span>Senha</span>
                <span>Cadastro</span>
              </div>

              {filteredLeads.length === 0 && (
                <p className={styles.empty}>Nenhum lead encontrado.</p>
              )}

              {filteredLeads.map((lead) => (
                <div
                  key={lead.uid}
                  className={styles.row}
                  style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
                >
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {lead.name ?? "—"}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {lead.email ?? "—"}
                    </p>
                  </div>
                  <span className="text-slate-300 text-sm">
                    {objetivoLabels[lead.quizAnswers?.objetivo ?? ""] ?? "—"}
                  </span>
                  <span className="text-sm">
                    {lead.senhaDefinida ? (
                      <span className="text-emerald-400">✅ Sim</span>
                    ) : (
                      <span className="text-slate-500">❌ Não</span>
                    )}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {lead.createdAt?.toDate
                      ? lead.createdAt.toDate().toLocaleDateString("pt-BR")
                      : "—"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ABA EVENTOS — log bruto, igual antes */}
        {tab === "eventos" && (
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔎 Buscar evento..."
              className={styles.searchInput}
            />

            <div className={styles.tableWrap}>
              <div
                className={styles.tableHeader}
                style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}
              >
                <span>Evento</span>
                <span>Informações</span>
                <span>Data</span>
              </div>

              {filteredEvents.length === 0 && (
                <p className={styles.empty}>Nenhum evento encontrado.</p>
              )}

              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={styles.row}
                  style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}
                >
                  <p className="text-white font-semibold text-sm">
                    {eventLabels[event.event] ?? event.event}
                  </p>
                  <div className="text-slate-400 text-xs space-y-1">
                    {Object.keys(event.meta ?? {}).length > 0 ? (
                      Object.entries(event.meta ?? {}).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                  <span className="text-slate-400 text-xs">
                    {event.createdAt &&
                    typeof event.createdAt === "object" &&
                    "toDate" in event.createdAt
                      ? (event.createdAt as { toDate: () => Date })
                          .toDate()
                          .toLocaleString("pt-BR")
                      : "-"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
