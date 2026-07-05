const INTEGRATIONS = [
  { name: "GitHub", config: "repo: connect" },
  { name: "GitHub Actions", config: "workflow: ci/cd" },
  { name: "Kubernetes", config: "cluster: prod-1" },
  { name: "Docker", config: "image: latest" },
  { name: "Terraform", config: "state: linked" },
  { name: "Prometheus", config: "metrics: active" },
  { name: "Grafana", config: "dash: synced" },
  { name: "Loki", config: "logs: streaming" },
  { name: "OpenTelemetry", config: "traces: on" },
  { name: "SonarQube", config: "scan: passed" },
  { name: "Trivy", config: "vuln: clean" },
  { name: "Slack", config: "notify: on" },
] as const;

export default function Integrations() {
  return (
    <section id="integrations" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Integrates with your existing stack
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INTEGRATIONS.map((item) => (
            <div
              key={item.name}
              className="group rounded-xl border border-border/80 bg-background/50 p-4 transition-all hover:border-cyan/40 hover:bg-card/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-foreground">{item.name}</span>
                <span className="font-mono text-[9px] text-green-400">[OK]</span>
              </div>
              <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                <span className="text-purple">&quot;</span>
                {item.config}
                <span className="text-purple">&quot;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
