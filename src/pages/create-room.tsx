import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { dayjs } from "@/lib/dayjs";

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
  createdAt: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-auto  max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />
          <Card>
            <CardHeader>
              <CardTitle>Recent rooms</CardTitle>
              <CardDescription>Quick access to recent rooms</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isLoading && <p className="text-muted-foreground text-sm">Loading rooms...</p>}

              {data?.map((room) => (
                <Link
                  key={room.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
                  to={`/room/${room.id}`}
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="font-medium">{room.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {dayjs(room.createdAt).toNow()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {room.questionsCount} perguntas(s)
                      </Badge>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    Enter
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
