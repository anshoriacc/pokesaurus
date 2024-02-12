import { TPokemonDetail, TStatList } from "@/lib/graphql-client";

type Props = {
  columns: TStatList["stats"];
  data: TPokemonDetail["pokemon_stats"];
};

export const Stats = ({ columns, data }: Props) => {
  const mergedData = columns.map(column => ({
    name: column.name,
    id: column.id,
    value: data.find(stat => stat.stat_id === column.id)?.base_stat ?? "N/A",
  }));

  return (
    <div className="flex flex-col gap-1">
      {mergedData.map(_data => (
        <div
          key={_data.id}
          className="group grid cursor-default grid-cols-[120px_1fr_32px] items-center gap-2">
          <span className="text-right text-sm text-neutral-500 group-hover:text-inherit">
            {_data.name}
          </span>

          <div className="relative h-[18px] w-full overflow-hidden rounded-full">
            <div
              style={{
                width: isNaN(Number(_data.value))
                  ? 0
                  : (Number(_data.value) / 255) * 100 + "%",
              }}
              className="absolute left-0 h-full bg-neutral-950 dark:bg-white"
            />
            <div className="h-full w-full bg-neutral-50 dark:bg-neutral-900" />
          </div>

          <span className="text-sm text-neutral-500 group-hover:text-inherit">
            {_data.value}
          </span>
        </div>
      ))}
    </div>
  );
};
