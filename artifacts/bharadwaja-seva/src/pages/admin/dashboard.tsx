import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  useAdminMe,
  useAdminLogout,
  useListEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  useListCommitteeMembers,
  useCreateCommitteeMember,
  useUpdateCommitteeMember,
  useDeleteCommitteeMember,
  type GalleryEvent,
  type CommitteeMember,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, LogOut, Loader2, Upload, X, Pencil, Save } from "lucide-react";
import { uploadFile } from "@/lib/uploadFile";

type ApiEvent = GalleryEvent;
type ApiMember = CommitteeMember;

const CATEGORY_OPTIONS = [
  { value: "feeding", label: "Feeding the Needy" },
  { value: "education", label: "Supporting Education" },
  { value: "medical", label: "Medical Relief" },
  { value: "youth", label: "Youth Empowerment" },
  { value: "elderly", label: "Care for the Elderly" },
  { value: "women", label: "Women & Children" },
  { value: "environment", label: "Environmental Protection" },
  { value: "community", label: "Community Services" },
  { value: "other", label: "Other" },
];

const GROUP_OPTIONS = [
  { value: "office_bearers", label: "Office Bearers" },
  { value: "executive_body", label: "Executive Body" },
  { value: "members", label: "Member" },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const qc = useQueryClient();
  const { data: me, isLoading, isError } = useAdminMe({
    query: { retry: false, queryKey: ["adminMe"] },
  });
  const { mutateAsync: logout } = useAdminLogout();

  useEffect(() => {
    if (!isLoading && (isError || !me)) {
      setLocation("/admin/login");
    }
  }, [isLoading, isError, me, setLocation]);

  if (isLoading || !me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  async function onLogout() {
    await logout();
    qc.removeQueries({ queryKey: ["adminMe"] });
    qc.clear();
    setLocation("/admin/login");
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide">
            Admin · Bharadwaja Seva Sangham
          </h1>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm opacity-80">{me.username}</span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary rounded-none"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events">
          <TabsList className="rounded-none">
            <TabsTrigger value="events" className="rounded-none">Gallery Events</TabsTrigger>
            <TabsTrigger value="committee" className="rounded-none">Committee Members</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="mt-6">
            <EventsAdmin />
          </TabsContent>
          <TabsContent value="committee" className="mt-6">
            <CommitteeAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

const TODAY = () => new Date().toISOString().slice(0, 10);

const EMPTY_EVENT = {
  titleEn: "", titleTe: "", titleHi: "",
  descEn: "", descTe: "", descHi: "",
  eventDate: TODAY(), category: "community",
  photoUrls: [] as string[],
};

function EventsAdmin() {
  const { data: events = [], refetch } = useListEvents();
  const { mutateAsync: createEvent, isPending: creating } = useCreateEvent();
  const { mutateAsync: updateEvent, isPending: updating } = useUpdateEvent();
  const { mutateAsync: deleteEvent } = useDeleteEvent();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...EMPTY_EVENT });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setEditingId(null);
    setForm({ ...EMPTY_EVENT, eventDate: TODAY() });
    setError(null);
  }

  function loadForEdit(e: ApiEvent) {
    setEditingId(e.id);
    setForm({
      titleEn: e.titleEn, titleTe: e.titleTe, titleHi: e.titleHi,
      descEn: e.descriptionEn, descTe: e.descriptionTe, descHi: e.descriptionHi,
      eventDate: e.eventDate, category: e.category,
      photoUrls: [...e.photoUrls],
    });
    setError(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onPickFiles(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(ev.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const urls = await Promise.all(files.map((f) => uploadFile(f)));
      setForm((p) => ({ ...p, photoUrls: [...p.photoUrls, ...urls] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      ev.target.value = "";
    }
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    const payload = {
      titleEn: form.titleEn, titleTe: form.titleTe, titleHi: form.titleHi,
      descriptionEn: form.descEn, descriptionTe: form.descTe, descriptionHi: form.descHi,
      eventDate: form.eventDate, category: form.category, photoUrls: form.photoUrls,
    };
    try {
      if (editingId !== null) {
        await updateEvent({ id: editingId, data: payload });
      } else {
        await createEvent({ data: payload });
      }
      reset();
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this event?")) return;
    await deleteEvent({ id });
    if (editingId === id) reset();
    await refetch();
  }

  const isSaving = creating || updating;
  const isEditing = editingId !== null;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="rounded-none border-t-4 border-t-primary">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif">
            {isEditing ? `Edit Event #${editingId}` : "Add New Event"}
          </CardTitle>
          {isEditing && (
            <Button type="button" variant="outline" size="sm" onClick={reset} className="rounded-none">
              Cancel
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title (English) *</Label>
              <Input value={form.titleEn} onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Title (Telugu)</Label>
                <Input value={form.titleTe} onChange={(e) => setForm((p) => ({ ...p, titleTe: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Title (Hindi)</Label>
                <Input value={form.titleHi} onChange={(e) => setForm((p) => ({ ...p, titleHi: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description (English)</Label>
              <Textarea value={form.descEn} onChange={(e) => setForm((p) => ({ ...p, descEn: e.target.value }))} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Description (Telugu)</Label>
                <Textarea value={form.descTe} onChange={(e) => setForm((p) => ({ ...p, descTe: e.target.value }))} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Description (Hindi)</Label>
                <Textarea value={form.descHi} onChange={(e) => setForm((p) => ({ ...p, descHi: e.target.value }))} rows={2} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input type="date" value={form.eventDate} onChange={(e) => setForm((p) => ({ ...p, eventDate: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/90 text-sm">
                  <Upload className="w-4 h-4" />
                  {uploading ? "Uploading..." : "Upload Photos"}
                  <input type="file" accept="image/*" multiple onChange={onPickFiles} className="hidden" disabled={uploading} />
                </label>
                <span className="text-sm text-muted-foreground">{form.photoUrls.length} photo(s)</span>
              </div>
              {form.photoUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {form.photoUrls.map((url, i) => (
                    <div key={i} className="relative aspect-square bg-muted">
                      <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, photoUrls: p.photoUrls.filter((_, j) => j !== i) }))}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                        aria-label="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={isSaving || uploading || !form.titleEn}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Event"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-none border-t-4 border-t-secondary">
        <CardHeader>
          <CardTitle className="font-serif">All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[800px] overflow-y-auto">
          {events.length === 0 && <p className="text-muted-foreground text-sm">No events yet.</p>}
          {(events as ApiEvent[]).map((e) => (
            <div
              key={e.id}
              className={`border bg-white p-3 flex gap-3 items-start ${editingId === e.id ? "ring-2 ring-primary" : ""}`}
            >
              {e.photoUrls[0] && (
                <img src={e.photoUrls[0]} alt="" className="w-20 h-20 object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{e.titleEn}</p>
                <p className="text-xs text-muted-foreground">
                  {e.eventDate} · {e.category} · {e.photoUrls.length} photo(s)
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="outline" onClick={() => loadForEdit(e)} className="rounded-none">
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(e.id)} className="rounded-none">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

const EMPTY_MEMBER = {
  nameEn: "", nameTe: "", nameHi: "",
  roleEn: "Member", roleTe: "", roleHi: "",
  groupKey: "members",
  sortOrder: 0,
};

function CommitteeAdmin() {
  const { data: members = [], refetch } = useListCommitteeMembers();
  const { mutateAsync: createMember, isPending: creating } = useCreateCommitteeMember();
  const { mutateAsync: updateMember, isPending: updating } = useUpdateCommitteeMember();
  const { mutateAsync: deleteMember } = useDeleteCommitteeMember();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...EMPTY_MEMBER });
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setEditingId(null);
    setForm({ ...EMPTY_MEMBER });
    setError(null);
  }

  function loadForEdit(m: ApiMember) {
    setEditingId(m.id);
    setForm({
      nameEn: m.nameEn, nameTe: m.nameTe, nameHi: m.nameHi,
      roleEn: m.roleEn, roleTe: m.roleTe, roleHi: m.roleHi,
      groupKey: m.groupKey, sortOrder: m.sortOrder,
    });
    setError(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    try {
      if (editingId !== null) {
        await updateMember({ id: editingId, data: form });
      } else {
        await createMember({
          data: { ...form, sortOrder: members.length },
        });
      }
      reset();
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this member?")) return;
    await deleteMember({ id });
    if (editingId === id) reset();
    await refetch();
  }

  const grouped: Record<string, ApiMember[]> = { office_bearers: [], executive_body: [], members: [] };
  for (const m of members as ApiMember[]) {
    (grouped[m.groupKey] ?? (grouped[m.groupKey] = [])).push(m);
  }

  const isSaving = creating || updating;
  const isEditing = editingId !== null;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="rounded-none border-t-4 border-t-primary">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif">
            {isEditing ? `Edit Member #${editingId}` : "Add New Member"}
          </CardTitle>
          {isEditing && (
            <Button type="button" variant="outline" size="sm" onClick={reset} className="rounded-none">
              Cancel
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name (English) *</Label>
              <Input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Name (Telugu)</Label>
                <Input value={form.nameTe} onChange={(e) => setForm((p) => ({ ...p, nameTe: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Name (Hindi)</Label>
                <Input value={form.nameHi} onChange={(e) => setForm((p) => ({ ...p, nameHi: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role (English) *</Label>
              <Input value={form.roleEn} onChange={(e) => setForm((p) => ({ ...p, roleEn: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Role (Telugu)</Label>
                <Input value={form.roleTe} onChange={(e) => setForm((p) => ({ ...p, roleTe: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Role (Hindi)</Label>
                <Input value={form.roleHi} onChange={(e) => setForm((p) => ({ ...p, roleHi: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Group *</Label>
              <Select value={form.groupKey} onValueChange={(v) => setForm((p) => ({ ...p, groupKey: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GROUP_OPTIONS.map((g) => (
                    <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={isSaving || !form.nameEn || !form.roleEn}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase font-bold tracking-wider"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Member"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-none border-t-4 border-t-secondary">
        <CardHeader>
          <CardTitle className="font-serif">All Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[800px] overflow-y-auto">
          {(["office_bearers", "executive_body", "members"] as const).map((g) => {
            const list = grouped[g] ?? [];
            if (list.length === 0) return null;
            const label = GROUP_OPTIONS.find((x) => x.value === g)?.label ?? g;
            return (
              <div key={g}>
                <h3 className="text-xs uppercase font-bold text-primary tracking-wider mb-2">
                  {label} ({list.length})
                </h3>
                <div className="space-y-1">
                  {list.map((m) => (
                    <div
                      key={m.id}
                      className={`border bg-white px-3 py-2 flex justify-between items-center ${editingId === m.id ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{m.nameEn}</p>
                        <p className="text-xs text-muted-foreground">{m.roleEn}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button size="sm" variant="outline" onClick={() => loadForEdit(m)} className="rounded-none">
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(m.id)} className="rounded-none">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
