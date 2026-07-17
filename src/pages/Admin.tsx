import { useEffect, useMemo, useState } from "react";

import {
  getAllEvents,
  type TrackedEvent,
  type EventName,
} from "../services/eventService";

const styles = {
  page: "min-h-dvh bg-slate-950 px-6 py-10",

  container: "max-w-5xl mx-auto",

  title: "text-2xl font-bold text-white mb-1",

  subtitle: "text-slate-500 text-sm mb-8",

  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-10",

  card: "bg-white/5 border border-white/10 rounded-2xl p-5",

  number: "text-3xl font-bold text-amber-400",

  label: "text-slate-400 text-xs mt-2",

  tableWrap: "bg-white/5 border border-white/10 rounded-3xl overflow-hidden",

  tableHeader:
    "grid grid-cols-3 px-5 py-4 text-xs uppercase font-bold text-slate-500 border-b border-white/10",

  row: "grid grid-cols-3 gap-4 px-5 py-4 border-b border-white/5 last:border-none",

  eventName: "text-white font-semibold text-sm",

  meta: "text-slate-400 text-xs space-y-1",

  empty: "text-slate-500 text-center py-10",
};

const funnelOrder: EventName[] = [
  "quiz_start",
  "quiz_complete",
  "lead_captured",
  "result_view",
  "acesso_view",
  "product_click",
  "combo_click",
];

const eventLabels: Record<string, string> = {
  quiz_start: "🚀 Iniciou Quiz",

  quiz_complete: "✅ Finalizou Quiz",

  lead_captured: "📩 Capturou Lead",

  result_view: "🎯 Viu Resultado",

  acesso_view: "🔓 Entrou Área",

  product_click: "📦 Produto",

  combo_click: "🔥 Combo",

  password_defined: "🔑 Criou Senha",

  login: "👤 Login",
};

const eventColors: Record<string, string> = {
  quiz_start: "bg-blue-500/20 text-blue-300",

  quiz_complete: "bg-green-500/20 text-green-300",

  lead_captured: "bg-purple-500/20 text-purple-300",

  result_view: "bg-yellow-500/20 text-yellow-300",

  acesso_view: "bg-orange-500/20 text-orange-300",

  product_click: "bg-pink-500/20 text-pink-300",

  combo_click: "bg-red-500/20 text-red-300",

  password_defined: "bg-cyan-500/20 text-cyan-300",

  login: "bg-indigo-500/20 text-indigo-300",
};

export default function Admin() {
  const [events, setEvents] = useState<TrackedEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        setEvents(data);
      })

      .catch(() => {
        setError("Erro ao carregar eventos.");
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const counts = useMemo(() => {
    return events.reduce<Record<string, number>>((acc, event) => {
      acc[event.event] = (acc[event.event] ?? 0) + 1;

      return acc;
    }, {});
  }, [events]);
  const filteredEvents = useMemo(() => {
    if (!search.trim()) {
      return events;
    }

    return events.filter((event) => {
      const text = JSON.stringify(event).toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [events, search]);

  const conversion = useMemo(() => {
    const start = counts.quiz_start ?? 0;

    if (start === 0) {
      return [];
    }

    return funnelOrder.map((step) => {
      const value = counts[step] ?? 0;

      return {
        step,

        value,

        percent: Math.round((value / start) * 100),
      };
    });
  }, [counts]);

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
        <h1 className={styles.title}>📊 Painel do Funil</h1>

        <p className={styles.subtitle}>
          Acompanhe os usuários desde o quiz até o acesso.
        </p>

        <div className={styles.statsGrid}>
          {funnelOrder.map((item) => {
            return (
              <div key={item} className={styles.card}>
                <p className={styles.number}>{counts[item] ?? 0}</p>

                <p className={styles.label}>{eventLabels[item] ?? item}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-white font-bold mb-4">Conversão do funil</h2>

          <div className="space-y-3">
            {conversion.map((item) => {
              return (
                <div key={item.step} className="bg-white/5 rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm">
                      {eventLabels[item.step]}
                    </span>

                    <span className="text-amber-400 text-sm font-bold">
                      {item.percent}%
                    </span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{
                        width: `${item.percent}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 Buscar email ou evento..."
            className="
              w-full
              bg-white
              rounded-2xl
              px-5
              py-4
              text-black
            "
          />
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <span>Evento</span>

            <span>Informações</span>

            <span>Data</span>
          </div>

          {filteredEvents.length === 0 && (
            <p className={styles.empty}>Nenhum evento encontrado.</p>
          )}

          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.row}>
              <div>
                <p className={styles.eventName}>
                  {eventLabels[event.event] ?? event.event}
                </p>

                <p className="text-xs text-slate-500 mt-1">ID: {event.id}</p>
              </div>

              <div className={styles.meta}>
                {Object.keys(event.meta ?? {}).length > 0 ? (
                  Object.entries(event.meta ?? {}).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))
                ) : (
                  <span>Sem informações</span>
                )}
              </div>

              <span className="text-slate-400 text-xs">
                {formatTimestamp(event.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function formatTimestamp(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (
      value as {
        toDate: () => Date;
      }
    ).toDate === "function"
  ) {
    return (
      value as {
        toDate: () => Date;
      }
    )
      .toDate()
      .toLocaleString("pt-BR");
  }

  return "-";
}
