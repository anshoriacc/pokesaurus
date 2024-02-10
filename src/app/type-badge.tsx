import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = { type: string };

const TypeBadge = ({ type }: Props) => {
  const typeColors = (_type: string) => {
    switch (type) {
      case "normal":
        return "!bg-[#eaeade] dark:!bg-[#ccc9aa]";
      case "fire":
        return "!bg-[#f8b80e] dark:!bg-[#f67e0d]";
      case "water":
        return "!bg-[#36aff6] dark:!bg-[#0a79be]";
      case "electric":
        return "!bg-[#f7ff85] dark:!bg-[#fffa25]";
      case "grass":
        return "!bg-[#68f60a] dark:!bg-[#3e9709]";
      case "ice":
        return "!bg-[#66d1e5] dark:!bg-[#1a94a3]";
      case "fighting":
        return "!bg-[#d45f65] dark:!bg-[#e8121a]";
      case "poison":
        return "!bg-[#ca72eb] dark:!bg-[#a719d7]";
      case "ground":
        return "!bg-[#efe294] dark:!bg-[#e2d15b]";
      case "flying":
        return "!bg-[#dce5ea] dark:!bg-[#5eb9b4]";
      case "psychic":
        return "!bg-[#f55792] dark:!bg-[#ed0f64]";
      case "bug":
        return "!bg-[#d9fe9e] dark:!bg-[#bddd6e]";
      case "rock":
        return "!bg-[#958450] dark:!bg-[#786b3f]";
      case "ghost":
        return "!bg-[#bd98cb] dark:!bg-[#8f54a4]";
      case "dragon":
        return "!bg-[#d7b0ff] dark:!bg-[#8b56fe]";
      case "dark":
        return "!bg-[#926754] dark:!bg-[#604733]";
      case "steel":
        return "!bg-[#bbc5c4] dark:!bg-[#7b8e8a]";
      case "fairy":
        return "!bg-[#fdd1e0] dark:!bg-[#ff9fc2]";
      default:
        return "";
    }
  };

  return (
    <Badge className={cn(typeColors(type), "font-normal text-neutral-900")}>
      {type}
    </Badge>
  );
};

export default TypeBadge;
