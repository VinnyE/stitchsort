import type { ScoredMachine } from "../../types/machine";

interface ComparisonTableProps {
  results: ScoredMachine[];
}

const SPEC_ROWS = [
  { key: "price", label: "Typical Price" },
  { key: "fabricHandling", label: "Fabric Handling" },
  { key: "throatSpace", label: "Throat Space" },
  { key: "bobbinType", label: "Bobbin Type" },
] as const;

export default function ComparisonTable({ results }: ComparisonTableProps) {
  return (
    <section className="mt-32">
      <h2 className="font-headline text-3xl mb-12">Side-by-Side Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body text-sm">
          <thead>
            <tr className="bg-surface-container">
              <th className="p-6 font-semibold uppercase tracking-widest text-[10px]">
                Specification
              </th>
              {results.map((r) => (
                <th
                  key={r.machine.id}
                  className="p-6 font-headline text-lg border-l border-outline-variant/10"
                >
                  {r.machine.name.replace("Brother ", "").replace("Singer ", "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {SPEC_ROWS.map((row) => (
              <tr key={row.key}>
                <td className="p-6 font-medium text-on-surface-variant">
                  {row.label}
                </td>
                {results.map((r) => (
                  <td
                    key={r.machine.id}
                    className="p-6 border-l border-outline-variant/10"
                  >
                    {row.key === "price"
                      ? r.machine.priceRange
                      : r.machine.specs[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
