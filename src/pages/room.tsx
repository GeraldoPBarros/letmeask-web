import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, Navigate } from "react-router-dom";

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to={"/"} />;
  }

  // return <div>Room details: {JSON.stringify(params)}</div>;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-auto  max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />
          <Card>
            <CardHeader>
              <CardTitle>Salas Recentes</CardTitle>
              <CardDescription>Acesso rápido às salas recentes</CardDescription>
              <CardContent className="flex flex-col gap-3">
                {data?.map((room) => (
                  <div key={room.id}>
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p>{room.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
