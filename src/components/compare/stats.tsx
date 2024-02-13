import { TPokemonDetail, TStatList } from "@/lib/graphql-client";
import { cn } from "@/lib/utils";

type Props = {
  columns: TStatList["stats"];
  data: TPokemonDetail["pokemon_stats"];
  isReversed?: boolean;
};

export const Stats = ({ columns, data, isReversed }: Props) => {
  const mergedData = columns.map(column => ({
    name: column.name,
    id: column.id,
    value: data.find(stat => stat.stat_id === column.id)?.base_stat ?? "N/A",
  }));

  return (
    <div className="group/parent flex h-full flex-col justify-end gap-1">
      {mergedData.map(_data => (
        <div
          key={_data.id}
          className={cn(
            "group/statitem grid cursor-default  items-center gap-1",
            !isReversed ? "grid-cols-[1fr_24px]" : "grid-cols-[24px_1fr]",
          )}>
          {!isReversed ? (
            <>
              <div className="relative h-4 w-full overflow-hidden rounded-full">
                <div
                  style={{
                    width: isNaN(Number(_data.value))
                      ? 0
                      : (Number(_data.value) / 255) * 100 + "%",
                  }}
                  className="absolute left-0 h-full rounded-full bg-neutral-950 group-hover/parent:bg-neutral-500 group-hover/statitem:bg-neutral-950 dark:bg-white dark:group-hover/statitem:bg-white"
                />
                <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" />
              </div>

              <span className="text-xs text-neutral-500 group-hover/statitem:text-inherit">
                {_data.value}
              </span>
            </>
          ) : (
            <>
              <span className="text-xs text-neutral-500 group-hover/statitem:text-inherit">
                {_data.value}
              </span>

              <div className="relative h-4 w-full overflow-hidden rounded-full">
                <div
                  style={{
                    width: isNaN(Number(_data.value))
                      ? 0
                      : (Number(_data.value) / 255) * 100 + "%",
                  }}
                  className="absolute left-0 h-full rounded-full bg-neutral-950 group-hover/parent:bg-neutral-500 group-hover/statitem:bg-neutral-950 dark:bg-white dark:group-hover/statitem:bg-white"
                />
                <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
