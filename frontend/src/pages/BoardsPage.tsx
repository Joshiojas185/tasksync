import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Board } from "@/types";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Layout as LayoutIcon, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BoardsPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/boards");
      if (response.data.success) {
        setBoards(response.data.boards);
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async () => {
    try {
      const res = await api.post('/api/boards', newBoard);
      if (res.data.success) {
        setIsDialogOpen(false);
        setNewBoard({ title: '', description: '' });
        fetchBoards();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
            <p className="text-slate-400 mt-1">Select a board to manage your tasks and sprints.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Plus className="w-4 h-4" /> New Board
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Board</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Board Title</Label>
                  <Input id="title" value={newBoard.title} onChange={(e) => setNewBoard({...newBoard, title: e.target.value})} className="bg-slate-800 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" value={newBoard.description} onChange={(e) => setNewBoard({...newBoard, description: e.target.value})} className="bg-slate-800 border-slate-700" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateBoard} className="bg-blue-600 hover:bg-blue-700 w-full">Create Board</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl bg-slate-900/50" />
            ))
          ) : (
            boards.map((board) => (
              <Card
                key={board.id}
                className="group relative bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => navigate(`/board/${board.id}`)}
              >
                <CardHeader className="p-6">
                  <div className="p-2 w-fit rounded-lg bg-blue-600/10 text-blue-500 mb-4">
                    <LayoutIcon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {board.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-2 line-clamp-2">
                    {board.description || "No description provided."}
                  </CardDescription>
                  <div className="mt-6 flex items-center text-xs text-slate-500 gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(board.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BoardsPage;