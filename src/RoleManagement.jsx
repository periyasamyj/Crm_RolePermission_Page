import { useState, useMemo } from "react";
import {
  Box, Typography, Button, TextField, Dialog, DialogContent, DialogTitle, DialogActions,
  Stepper, Step, StepLabel, StepConnector, Switch, Select,
  MenuItem, FormControl, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, IconButton,
  InputAdornment, Checkbox, Card, CardContent, Divider,
  Tooltip, Menu, ListItemIcon, ListItemText, Tab, Tabs,
  LinearProgress, alpha, ThemeProvider, createTheme,
  stepConnectorClasses, styled, Snackbar, Alert,
  ToggleButton, ToggleButtonGroup, Avatar, Stack, Grid
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import ShieldIcon from "@mui/icons-material/Shield";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import KeyIcon from "@mui/icons-material/Key";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// ─── Theme ──────────────────────────────────────────────────────────────────
const NAVY = "#0F2342";
const NAVY_MID = "#162D52";
const NAVY_LIGHT = "#1E3A6E";
const BLUE = "#2563EB";
const BLUE_ACC = "#2563EB";
const BLUE_LIGHT = "#3B82F6";
const BLUE_PALE = "#EFF6FF";
const BLUE_MID = "#DBEAFE";
const SURFACE = "#F8FAFC";
const BORDER = "#E2E8F0";
const GRAY_ICON = "#64748B";

const theme = createTheme({
  palette: {
    primary: { main: BLUE, dark: "#1D4ED8", light: BLUE_LIGHT, contrastText: "#fff" },
    secondary: { main: "#F59E0B" },
    background: { default: SURFACE, paper: "#FFFFFF" },
    text: { primary: "#0F172A", secondary: "#64748B" },
    success: { main: "#10B981" },
    error: { main: "#EF4444" },
    warning: { main: "#F59E0B" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h6: { fontWeight: 700, letterSpacing: "-0.3px" },
    subtitle2: { fontWeight: 600, fontSize: "0.8rem" },
    body2: { fontSize: "0.84rem" },
    caption: { fontSize: "0.72rem", letterSpacing: "0.4px" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 8, boxShadow: "none", "&:hover": { boxShadow: "none" } },
        containedPrimary: { background: `linear-gradient(135deg, ${BLUE_LIGHT} 0%, #1D4ED8 100%)`, "&:hover": { background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)` } },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.7px", textTransform: "uppercase", color: "#94A3B8", background: "#F8FAFC", padding: "11px 16px", borderBottom: `1px solid ${BORDER}` },
        body: { padding: "13px 16px", fontSize: "0.84rem", borderBottom: "1px solid #F1F5F9" },
      },
    },
    MuiTextField: { styleOverrides: { root: { "& .MuiOutlinedInput-root": { borderRadius: 8, "&.Mui-focused fieldset": { borderColor: BLUE } } } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600, fontSize: "0.72rem" } } },
    MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, fontSize: "0.84rem", minHeight: 44 } } },
  },
});

// ─── Data ───────────────────────────────────────────────────────────────────
const MODULES = [
  "Announcements", "Appraisal", "Bank", "Company", "Dashboard",
  "HR Employees", "User Management", "Reports", "Settings",
  "Leads", "Contacts", "Deals"
];

// Permissions with gray styling (no colors)
const PERMISSIONS = [
  { key: "view", label: "View", icon: <VisibilityIcon sx={{ fontSize: 15 }} /> },
  { key: "create", label: "Create", icon: <AddIcon sx={{ fontSize: 15 }} /> },
  { key: "edit", label: "Edit", icon: <EditIcon sx={{ fontSize: 15 }} /> },
  { key: "delete", label: "Delete", icon: <DeleteOutlineIcon sx={{ fontSize: 15 }} /> },
  { key: "approve", label: "Approve", icon: <ThumbUpIcon sx={{ fontSize: 15 }} /> },
  { key: "reject", label: "Reject", icon: <ThumbDownIcon sx={{ fontSize: 15 }} /> },
];

// Action styles for permissions - all gray
const ACTION_STYLES = {
  view: { icon: <VisibilityIcon sx={{ fontSize: 18 }} /> },
  create: { icon: <AddIcon sx={{ fontSize: 18 }} /> },
  edit: { icon: <EditIcon sx={{ fontSize: 18 }} /> },
  delete: { icon: <DeleteOutlineIcon sx={{ fontSize: 18 }} /> },
  approve: { icon: <ThumbUpIcon sx={{ fontSize: 18 }} /> },
  reject: { icon: <ThumbDownIcon sx={{ fontSize: 18 }} /> },
};

const INIT_ROLES = [
  { id: 1, name: "Manager", description: "Team lead with management access", status: "Active", isAdmin: false, createdDate: "3/13/2026", createdTime: "09:00 AM", updatedDate: "3/13/2026", permissions: { Announcements: { view: true, create: true }, Dashboard: { view: true } }, users: 8, isDuplicated: false },
  { id: 2, name: "Staff", description: "General staff access level", status: "Active", isAdmin: false, createdDate: "3/13/2026", createdTime: "09:00 AM", updatedDate: "3/13/2026", permissions: { Announcements: { view: true } }, users: 24, isDuplicated: false },
  { id: 3, name: "admin", description: "System admin role", status: "Active", isAdmin: true, createdDate: "3/14/2026", createdTime: "10:30 AM", updatedDate: "3/14/2026", permissions: { Announcements: { view: true, create: true, edit: true, delete: true } }, users: 3, isDuplicated: false },
  { id: 4, name: "super admin", description: "Full privileges across all modules", status: "Active", isAdmin: true, createdDate: "3/14/2026", createdTime: "11:00 AM", updatedDate: "3/14/2026", permissions: {}, users: 1, isDuplicated: false },
  { id: 5, name: "HR Lead", description: "Human resources management access", status: "Active", isAdmin: false, createdDate: "3/14/2026", createdTime: "11:30 AM", updatedDate: "3/14/2026", permissions: { "HR Employees": { view: true, create: true, edit: true, approve: true } }, users: 5, isDuplicated: false },
  { id: 6, name: "Sales Rep", description: "Sales module access", status: "Inactive", isAdmin: false, createdDate: "3/14/2026", createdTime: "12:00 PM", updatedDate: "3/14/2026", permissions: { Leads: { view: true, create: true }, Deals: { view: true } }, users: 0, isDuplicated: false },
];

// ─── Styled ──────────────────────────────────────────────────────────────────
const CustomConnector = styled(StepConnector)(() => ({
  [`& .${stepConnectorClasses.line}`]: { borderColor: "#E2E8F0", borderTopWidth: 2, borderRadius: 1 },
}));

function StepDot({ active, completed, icon }) {
  const isActiveOrCompleted = active || completed;
  return (
    <Box sx={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", transition: "all 0.3s", background: isActiveOrCompleted ? NAVY : "#F1F5F9", color: isActiveOrCompleted ? "#fff" : "#64748B" }}>
      {completed ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : icon}
    </Box>
  );
}

function PermRow({ perm, checked, onChange }) {
  return (
    <Box onClick={onChange} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.2, mb: 0.8, borderRadius: 2, cursor: "pointer", transition: "all 0.15s", border: `1.5px solid ${checked ? alpha(GRAY_ICON, 0.4) : BORDER}`, background: checked ? alpha(GRAY_ICON, 0.05) : "#FAFBFC", "&:hover": { borderColor: GRAY_ICON, background: alpha(GRAY_ICON, 0.04) } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: alpha(GRAY_ICON, checked ? 0.15 : 0.08), color: GRAY_ICON }}>{perm.icon}</Box>
        <Typography variant="body2" fontWeight={600} color={checked ? "text.primary" : "text.secondary"}>{perm.label}</Typography>
      </Box>
      <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${checked ? GRAY_ICON : "#CBD5E1"}`, display: "flex", alignItems: "center", justifyContent: "center", background: checked ? GRAY_ICON : "transparent", transition: "all 0.2s" }}>
        {checked && <CheckCircleIcon sx={{ fontSize: 12, color: "#fff" }} />}
      </Box>
    </Box>
  );
}

function KanbanCard({ role, onView, onEdit }) {
  const totalPerms = Object.values(role.permissions).reduce((a, m) => a + Object.values(m).filter(Boolean).length, 0);
  return (
    <Box sx={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 2.5, p: 2, mb: 1.5, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", transition: "all 0.2s", "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)", borderColor: BLUE, transform: "translateY(-1px)" } }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 30, height: 30, borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center", background: role.isAdmin ? alpha(BLUE, 0.12) : alpha("#64748B", 0.08) }}>
            <ShieldIcon sx={{ fontSize: 15, color: role.isAdmin ? BLUE : "#64748B" }} />
          </Box>
          <Typography variant="body2" fontWeight={700}>{role.name}</Typography>
        </Box>
        <IconButton size="small" onClick={() => onEdit(role)} sx={{ color: "#CBD5E1", "&:hover": { color: BLUE } }}><EditIcon sx={{ fontSize: 14 }} /></IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5, lineHeight: 1.4 }}>{role.description}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <GroupIcon sx={{ fontSize: 13, color: "#94A3B8" }} />
          <Typography variant="caption" color="text.secondary">{role.users} users</Typography>
        </Box>
        <Chip label={`${totalPerms} perms`} size="small" sx={{ fontSize: "0.65rem", height: 18, background: BLUE_PALE, color: BLUE, fontWeight: 700 }} />
      </Box>
    </Box>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function RoleManagement() {
  const [roles, setRoles] = useState(INIT_ROLES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusF] = useState("All");
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetRole, setTarget] = useState(null);

  const [step, setStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleStatus, setRoleStatus] = useState("Active");
  const [activeModule, setActiveMod] = useState("Announcements");
  const [permSearch, setPermSearch] = useState("");
  const [modulePerms, setModPerms] = useState({});

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRole, setMenuRole] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  // Dynamic steps based on isAdmin
  const steps = useMemo(() => {
    if (isAdmin) {
      return ["Role Details", "Review & Done"];
    }
    return ["Role Details", "Manage Permissions", "Review & Done"];
  }, [isAdmin]);

  const toast = (msg, severity = "success") => setSnack({ open: true, msg, severity });

  const totalPermsOf = r => Object.values(r.permissions).reduce((a, m) => a + Object.values(m).filter(Boolean).length, 0);
  const totalSelected = Object.values(modulePerms).reduce((a, m) => a + Object.values(m).filter(Boolean).length, 0);
  const getActiveP = () => modulePerms[activeModule] || {};

  const resetForm = () => {
    setStep(0);
    setRoleName("");
    setRoleDesc("");
    setIsAdmin(false);
    setRoleStatus("Active");
    setModPerms({});
    setActiveMod("Announcements");
    setPermSearch("");
    setIsEditing(false);
  };

  const openCreate = () => { resetForm(); setCreateOpen(true); };

  const openEdit = (role) => {
    setIsEditing(true);
    setRoleName(role.name);
    setRoleDesc(role.description === "No description provided" ? "" : role.description);
    setIsAdmin(role.isAdmin);
    setRoleStatus(role.status);
    setModPerms(JSON.parse(JSON.stringify(role.permissions)));
    setTarget(role);
    setStep(0);
    setCreateOpen(true);
  };

  const openView = (role) => { setTarget(role); setViewOpen(true); };
  const openDelete = (role) => { setTarget(role); setDeleteOpen(true); setMenuAnchor(null); };
  const handleMenuOpen = (e, role) => { setMenuAnchor(e.currentTarget); setMenuRole(role); };
  const handleMenuClose = () => { setMenuAnchor(null); setMenuRole(null); };

  const togglePerm = (mod, pKey) => setModPerms(prev => ({ ...prev, [mod]: { ...(prev[mod] || {}), [pKey]: !(prev[mod]?.[pKey]) } }));
  const selectAll = () => {
    const all = {};
    PERMISSIONS.forEach(p => { all[p.key] = true; });
    setModPerms(prev => ({ ...prev, [activeModule]: all }));
  };
  const clearAll = () => setModPerms(prev => ({ ...prev, [activeModule]: {} }));

  const submitRole = () => {
    if (isEditing) {
      // When editing a role, check if it's a duplicated role being activated
      const isDuplicatedRole = targetRole?.isDuplicated || false;

      setRoles(prev => prev.map(r => r.id === targetRole.id ? {
        ...r,
        name: roleName,
        description: roleDesc || "No description provided",
        isAdmin,
        status: roleStatus,
        permissions: modulePerms,
        updatedDate: new Date().toLocaleDateString(),
        // Once edited and saved as an active role, it permanently regains normal flow
        isDuplicated: roleStatus === "Active" ? false : r.isDuplicated
      } : r));
      toast("Role updated successfully");
    } else {
      // Creating a new role through Create Role button - normal flow with all options
      setRoles(prev => [...prev, {
        id: Date.now(),
        name: roleName,
        description: roleDesc || "No description provided",
        status: roleStatus,
        isAdmin,
        createdDate: new Date().toLocaleDateString(),
        createdTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        updatedDate: new Date().toLocaleDateString(),
        permissions: modulePerms,
        users: 0,
        isDuplicated: false // Mark as regular role
      }]);
      toast("Role created successfully");
    }
    setCreateOpen(false);
    resetForm();
  };

  const confirmDelete = () => { setRoles(prev => prev.filter(r => r.id !== targetRole.id)); setDeleteOpen(false); setTarget(null); toast("Role deleted", "error"); };

  // Fixed: When duplicating a role, set status to "Inactive" by default and mark as duplicated
  const duplicateRole = (role) => {
    setRoles(prev => [...prev, {
      ...role,
      id: Date.now(),
      name: role.name + " (Copy)",
      status: "Inactive", // Always set to Inactive when duplicating
      users: 0,
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      updatedDate: new Date().toLocaleDateString(),
      isDuplicated: true // Mark as duplicated role
    }]);
    toast("Role duplicated (Inactive by default)");
    handleMenuClose();
  };

  const toggleStatus = (role) => {
    setRoles(prev => prev.map(r => r.id === role.id ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" } : r));
    toast(`Role ${role.status === "Active" ? "deactivated" : "activated"}`);
    handleMenuClose();
  };

  const filtered = useMemo(() => roles.filter(r => {
    const ms = r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === "All" || r.status === statusFilter;
    const mt = activeTab === 0 ? true : activeTab === 1 ? !r.isAdmin : r.isAdmin;
    return ms && mf && mt;
  }), [roles, search, statusFilter, activeTab]);

  const stats = {
    total: roles.length,
    active: roles.filter(r => r.status === "Active").length,
    inactive: roles.filter(r => r.status === "Inactive").length,
    admin: roles.filter(r => r.isAdmin).length
  };

  const isDuplicateName = useMemo(() => {
    return roles.some(r => r.name.trim().toLowerCase() === roleName.trim().toLowerCase() && (!isEditing || r.id !== targetRole?.id));
  }, [roles, roleName, isEditing, targetRole]);

  const canNext = step === 0 ? roleName.trim().length > 0 : true;

  const KANBAN_COLS = [
    { id: "standard-active", label: "Standard Active", color: "#10B981", bg: "#F0FDF4", roles: filtered.filter(r => !r.isAdmin && r.status === "Active") },
    { id: "admin", label: "Admin Roles", color: BLUE, bg: "#EFF6FF", roles: filtered.filter(r => r.isAdmin) },
    { id: "new-unassigned", label: "Unassigned", color: "#F59E0B", bg: "#FFFBEB", roles: filtered.filter(r => r.users === 0 && r.status === "Active") },
    { id: "inactive", label: "Inactive", color: "#EF4444", bg: "#FFF1F2", roles: filtered.filter(r => r.status === "Inactive") },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", background: SURFACE }}>

        {/* NAVBAR */}
        <Box sx={{ background: "transparent", px: { xs: 2, sm: 4, md: 6 }, mt: 2, height: { xs: "auto", md: 90 }, py: { xs: 2, md: 0 }, borderRadius: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, background: "linear-gradient(135deg, #3B82F6, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <VerifiedUserIcon sx={{ color: "#20065dff", fontSize: 18 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: "#000000ff", lineHeight: 1.2, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>Role Management</Typography>
              <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.89)", letterSpacing: "0.6px", textTransform: "uppercase" }}>Access Control Center</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", md: "auto" }, justifyContent: { xs: "space-between", md: "flex-end" } }}>
            <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)} size="small"
              sx={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, "& .MuiToggleButton-root": { border: "none", color: "rgba(11, 11, 11, 0.45)", py: 0.5, px: 1.2, "&.Mui-selected": { background: "rgba(255,255,255,0.14)", color: "#202665ff" } } }}>
              <ToggleButton value="list"><ViewListIcon fontSize="small" /></ToggleButton>
              <ToggleButton value="kanban"><ViewKanbanIcon fontSize="small" /></ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ px: 2.5, py: 0.9, fontSize: "0.84rem" }}>Create Role</Button>
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>

          {/* KPI CARDS - NEW VERSION */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2, mb: 3 }}>
            {[
              { label: "TOTAL ROLES", val: stats.total, icon: <GroupIcon />, col: BLUE_ACC, bg: BLUE_PALE, bd: BLUE_MID },
              { label: "ACTIVE ROLES", val: stats.active, icon: <CheckCircleIcon />, col: "#059669", bg: "#ECFDF5", bd: "#A7F3D0" },
              { label: "INACTIVE ROLES", val: stats.inactive, icon: <BlockIcon />, col: "#EF4444", bg: "#FEF2F2", bd: "#FECACA" },
              { label: "ADMIN ROLES", val: stats.admin, icon: <AdminPanelSettingsIcon />, col: "#B45309", bg: "#FFFBEB", bd: "#FDE68A" },
            ].map(({ label, val, icon, col, bg, bd }) => (
              <Card key={label} elevation={0} sx={{ border: `1px solid ${bd}`, borderRadius: 3 }}>
                <CardContent sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", "&:last-child": { pb: 2.5 } }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#64748B", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.7px" }}>{label}</Typography>
                    <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ mt: 0.4, lineHeight: 1 }}>{val}</Typography>
                  </Box>
                  <Box sx={{ width: 44, height: 44, borderRadius: 2.5, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: col }}>{icon}</Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* TOOLBAR */}
          <Box sx={{ background: "#fff", borderRadius: 3, border: `1px solid ${BORDER}`, p: 2, mb: 2.5, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "stretch", md: "center" }, gap: 2, flexWrap: "wrap" }}>
            <TextField size="small" placeholder="Search by role name or description..." value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#94A3B8", fontSize: 18 }} /></InputAdornment> }}
              sx={{ flex: { xs: "none", md: 1 }, minWidth: { xs: "100%", md: 240 } }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, flex: { xs: 1, md: "auto" }, justifyContent: "space-between" }}>
              <FormControl size="small" sx={{ minWidth: 140, flex: { xs: 1, sm: "unset" } }}>
                <Select value={statusFilter} onChange={e => setStatusF(e.target.value)}>
                  {["All", "Active", "Inactive"].map(s => <MenuItem key={s} value={s}>{s === "All" ? "All Status" : s}</MenuItem>)}
                </Select>
              </FormControl>
              <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ ml: { xs: 0, md: "auto" }, width: { xs: "100%", sm: "auto" }, minHeight: 36, "& .MuiTab-root": { minHeight: 36, py: 0.5, px: 2, fontSize: "0.78rem", borderRadius: 2 }, "& .MuiTabs-indicator": { backgroundColor: BLUE } }}>
                <Tab label={`All (${roles.length})`} />
                <Tab label={`Standard (${roles.filter(r => !r.isAdmin).length})`} />
                <Tab label={`Admin (${roles.filter(r => r.isAdmin).length})`} />
              </Tabs>
            </Box>
          </Box>

          {/* BULK ACTION BAR */}
          {selected.length > 0 && (
            <Box sx={{ background: alpha(BLUE, 0.06), border: `1px solid ${alpha(BLUE, 0.2)}`, borderRadius: 2, px: 2.5, py: 1.2, mb: 1.5, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 16, color: BLUE }} />
                <Typography variant="body2" color="primary" fontWeight={600}>{selected.length} role{selected.length > 1 ? "s" : ""} selected</Typography>
              </Box>
              <Button size="small" color="error" startIcon={<DeleteOutlineIcon />} sx={{ ml: { xs: 0, sm: "auto" }, width: { xs: "100%", sm: "auto" }, fontSize: "0.78rem" }}
                onClick={() => { setRoles(prev => prev.filter(r => !selected.includes(r.id))); setSelected([]); toast(`${selected.length} roles deleted`, "error"); }}>
                Delete Selected
              </Button>
            </Box>
          )}

          {/* ── LIST VIEW ──────────────────────────────────────────────────── */}
          {viewMode === "list" && (
            <>
              <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${BORDER}`, borderRadius: 3, overflow: "hidden" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox size="small" sx={{ color: "#94A3B8", "&.Mui-checked": { color: BLUE } }}
                          indeterminate={selected.length > 0 && selected.length < filtered.length}
                          checked={selected.length === filtered.length && filtered.length > 0}
                          onChange={e => setSelected(e.target.checked ? filtered.map(r => r.id) : [])} />
                      </TableCell>
                      {["S.No", "Role Name", "Description", "Status", "Admin Type", "Permissions", "Created", "Actions"].map(h => <TableCell key={h}>{h}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((role, i) => {
                      const pc = totalPermsOf(role);
                      return (
                        <TableRow key={role.id} hover sx={{ "&:last-child td": { border: 0 }, background: selected.includes(role.id) ? alpha(BLUE, 0.025) : "transparent" }}>
                          <TableCell padding="checkbox">
                            <Checkbox size="small" sx={{ color: "#94A3B8", "&.Mui-checked": { color: BLUE } }}
                              checked={selected.includes(role.id)}
                              onChange={e => setSelected(e.target.checked ? [...selected, role.id] : selected.filter(id => id !== role.id))} />
                          </TableCell>
                          <TableCell><Typography variant="body2" color="text.secondary">{i + 1}</Typography></TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Box sx={{ width: 34, height: 34, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", background: role.isAdmin ? `linear-gradient(135deg, ${BLUE_LIGHT}, #1D4ED8)` : alpha(BLUE, 0.08), color: role.isAdmin ? "#fff" : BLUE }}>
                                <ShieldIcon sx={{ fontSize: 16 }} />
                              </Box>
                              <Box>
                                <Typography variant="body2" fontWeight={700}>{role.name}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                                  <GroupIcon sx={{ fontSize: 11, color: "#94A3B8" }} />
                                  <Typography variant="caption" color="text.secondary">{role.users} users</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell><Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role.description}</Typography></TableCell>
                          <TableCell>
                            <Chip label={role.status} size="small" sx={{ background: role.status === "Active" ? "#ECFDF5" : "#FEF2F2", color: role.status === "Active" ? "#10B981" : "#EF4444", border: `1px solid ${role.status === "Active" ? "#A7F3D0" : "#FECACA"}`, fontWeight: 700 }} />
                          </TableCell>
                          <TableCell>
                            <Chip label={role.isAdmin ? "Yes" : "No"} size="small" sx={{ background: role.isAdmin ? alpha(BLUE, 0.08) : "#F8FAFC", color: role.isAdmin ? BLUE : "#64748B", border: `1px solid ${role.isAdmin ? BLUE_MID : BORDER}`, fontWeight: 700 }} />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${pc} permissions`}
                              size="small"
                              sx={{
                                bgcolor: pc > 0 ? alpha(BLUE_ACC || "#3B7395", 0.1) : "#f1f5f9",
                                color: pc > 0 ? (BLUE_ACC || "#3B7395") : "text.secondary",
                                fontWeight: 600,
                                fontSize: 11,
                                height: 22
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{role.createdDate}</Typography>
                            <Typography variant="caption" color="text.disabled">{role.createdTime}</Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={e => handleMenuOpen(e, role)} sx={{ color: "#94A3B8", "&:hover": { color: BLUE, background: alpha(BLUE, 0.08) } }}>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} sx={{ textAlign: "center", py: 6 }}>
                          <ShieldIcon sx={{ fontSize: 36, color: "#CBD5E1", mb: 1 }} />
                          <Typography color="text.secondary">No roles found</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Showing {filtered.length} of {roles.length} roles</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" size="small" sx={{ borderColor: BORDER, color: "text.secondary" }}>Previous</Button>
                  <Button variant="contained" size="small" sx={{ minWidth: 36 }}>1</Button>
                  <Button variant="outlined" size="small" sx={{ borderColor: BORDER, color: "text.secondary" }}>Next</Button>
                </Box>
              </Box>
            </>
          )}

          {/* ── KANBAN VIEW ────────────────────────────────────────────────── */}
          {viewMode === "kanban" && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4,1fr)" }, gap: 2, alignItems: "start" }}>
              {KANBAN_COLS.map(col => (
                <Box key={col.id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, px: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.8px", fontSize: "0.68rem" }}>{col.label}</Typography>
                    <Chip label={col.roles.length} size="small" sx={{ height: 18, fontSize: "0.65rem", background: "#F1F5F9", color: "#64748B", fontWeight: 700, ml: "auto" }} />
                  </Box>
                  <Box sx={{ background: col.bg, border: `1px solid ${BORDER}`, borderRadius: 2.5, p: 1.5, minHeight: 180 }}>
                    {col.roles.map(r => <KanbanCard key={r.id} role={r} onView={openView} onEdit={openEdit} />)}
                    {col.roles.length === 0 && <Typography variant="caption" color="text.disabled" sx={{ display: "block", textAlign: "center", mt: 3, py: 2 }}>No roles</Typography>}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* CONTEXT MENU - Only apply restrictions to duplicated roles that are inactive */}
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}
          PaperProps={{ elevation: 4, sx: { borderRadius: 2.5, border: `1px solid ${BORDER}`, minWidth: 195, mt: 0.5 } }}>
          {[
            { icon: <InfoOutlinedIcon fontSize="small" />, label: "View Details", color: "#475569", action: () => { openView(menuRole); handleMenuClose(); }, showAlways: true },
            { icon: <EditIcon fontSize="small" />, label: "Edit Role", color: BLUE, action: () => { openEdit(menuRole); handleMenuClose(); }, showAlways: true },
            // Only show Manage Permissions for: 
            // - Regular roles (not duplicated) OR
            // - Duplicated roles that have been activated (status Active)
            {
              icon: <KeyIcon fontSize="small" />, label: "Manage Permissions", color: "#8B5CF6", action: () => { if (menuRole) { openEdit(menuRole); setTimeout(() => setStep(1), 50); } handleMenuClose(); },
              showIf: (role) => !(role?.isDuplicated && role?.status === "Inactive")
            },
            // Only show Duplicate for:
            // - Regular roles (not duplicated) OR
            // - Duplicated roles that have been activated (status Active)
            {
              icon: <ContentCopyIcon fontSize="small" />, label: "Duplicate Role", color: "#F59E0B", action: () => menuRole && duplicateRole(menuRole),
              showIf: (role) => !(role?.isDuplicated && role?.status === "Inactive")
            },
            // Only show Activate/Deactivate for:
            // - Regular roles (not duplicated) OR
            // - Duplicated roles that have been activated (status Active)
            {
              icon: <SwapHorizIcon fontSize="small" />, label: menuRole?.status === "Active" ? "Deactivate" : "Activate", color: menuRole?.status === "Active" ? "#EF4444" : "#10B981", action: () => menuRole && toggleStatus(menuRole),
              showIf: (role) => !(role?.isDuplicated && role?.status === "Inactive")
            },
            { icon: <DeleteOutlineIcon fontSize="small" />, label: "Delete Role", color: "#EF4444", action: () => menuRole && openDelete(menuRole), showAlways: true },
          ].filter(item => {
            // Filter menu items based on role status and duplication flag
            if (item.showAlways) return true;
            if (item.showIf) return item.showIf(menuRole);
            return true;
          }).map(({ icon, label, color, action, divider }, i, filteredArray) => (
            <Box key={i}>
              {divider && <Divider sx={{ my: 0.5 }} />}
              <MenuItem onClick={action} sx={{ px: 2, py: 1, "&:hover": { background: alpha(color, 0.06) } }}>
                <ListItemIcon sx={{ color, minWidth: 32 }}>{icon}</ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: "0.84rem", fontWeight: 600, color }} />
              </MenuItem>
            </Box>
          ))}
        </Menu>

        {/* CREATE / EDIT DIALOG */}
        <Dialog open={createOpen} onClose={() => { setCreateOpen(false); resetForm(); }} maxWidth="sm" fullWidth
          PaperProps={{ sx: { borderRadius: 4, overflow: "hidden", maxHeight: "92vh" } }}>
          <Box sx={{ px: { xs: 2.5, sm: 3.5 }, pt: { xs: 2.5, sm: 3.5 }, pb: 2.5, position: "relative", borderBottom: `1px solid ${BORDER}` }}>
            <IconButton onClick={() => { setCreateOpen(false); resetForm(); }} size="small"
              sx={{ position: "absolute", top: { xs: 12, sm: 20 }, right: { xs: 12, sm: 20 }, background: "#F1F5F9", color: "#64748B", "&:hover": { background: "#E2E8F0", color: "#0F172A" } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3.5 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: "50%", background: "#F1F5F9", display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "center" }}>
                {isEditing ? <EditIcon sx={{ color: "#475569", fontSize: 22 }} /> : <ManageAccountsIcon sx={{ color: "#475569", fontSize: 24 }} />}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800} sx={{ color: NAVY, letterSpacing: "-0.5px", mb: 0.3 }}>{isEditing ? "Edit Role" : "Create New Role"}</Typography>
                <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.85rem" }}>
                  {step === 0 ? "Step 1: Fill in role details" :
                    step === 1 && !isAdmin ? "Step 2: Manage permissions" :
                      step === 1 && isAdmin ? "Step 2: Review & confirm" :
                        "Step 3: Review & confirm"}
                </Typography>
              </Box>
            </Box>
            <Stepper activeStep={step} connector={<CustomConnector />} sx={{ mb: 1 }}>
              {steps.map((label, i) => (
                <Step key={label} completed={i < step}>
                  <StepLabel StepIconComponent={({ active, completed }) => <StepDot active={active} completed={completed} icon={i + 1} />}
                    sx={{ "& .MuiStepLabel-label": { color: i <= step ? NAVY : "#64748B", fontWeight: i <= step ? 700 : 500, fontSize: "0.85rem", ml: 0.5 } }}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <DialogContent sx={{ px: { xs: 2.5, sm: 3.5 }, py: 3.5, overflowY: "auto" }}>
            {/* STEP 1 */}
            {step === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.8 }}>Role Name <Box component="span" color="error.main">*</Box></Typography>
                  <TextField fullWidth placeholder="e.g. Sales Manager" value={roleName} onChange={e => setRoleName(e.target.value)} size="small" autoFocus />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.8 }}>Description <Box component="span" color="text.secondary" fontWeight={400}>(Optional)</Box></Typography>
                  <TextField fullWidth multiline rows={3} placeholder="Describe this role..." value={roleDesc} onChange={e => setRoleDesc(e.target.value)} size="small" />
                </Box>
                <Box sx={{ border: `1.5px solid ${isAdmin ? alpha(BLUE, 0.45) : BORDER}`, borderRadius: 2.5, p: 2, display: "flex", alignItems: "center", gap: 2, cursor: "pointer", background: isAdmin ? BLUE_PALE : "#FAFBFC", transition: "all 0.2s" }} onClick={() => setIsAdmin(!isAdmin)}>
                  <Box sx={{ width: 38, height: 38, borderRadius: 2, background: isAdmin ? alpha("#F59E0B", 0.15) : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AdminPanelSettingsIcon sx={{ color: isAdmin ? "#F59E0B" : "#94A3B8", fontSize: 20 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">Administrator Role</Typography>
                    <Typography variant="caption" color="text.secondary">Grant full system access and administrative privileges</Typography>
                  </Box>
                  <Switch checked={isAdmin} size="small" onClick={e => e.stopPropagation()} onChange={e => setIsAdmin(e.target.checked)}
                    sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: BLUE }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: BLUE } }} />
                </Box>

              </Box>
            )}

            {/* STEP 2 - Only show permissions for non-admin roles */}
            {step === 1 && !isAdmin && (
              <Box>
                <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Select modules and assign permissions.</Typography>
                  <Box sx={{ display: "flex", gap: 0.8, alignSelf: { xs: "flex-end", sm: "auto" } }}>
                    <Button size="small" onClick={selectAll} variant="outlined" sx={{ fontSize: "0.72rem", py: 0.3, px: 1.2, borderColor: alpha(BLUE, 0.4), color: BLUE }}>
                      <DoneAllIcon sx={{ fontSize: 13, mr: 0.4 }} />All
                    </Button>
                    <Button size="small" onClick={clearAll} variant="outlined" sx={{ fontSize: "0.72rem", py: 0.3, px: 1.2, borderColor: BORDER, color: "#64748B" }}>Clear</Button>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, height: { xs: 400, sm: 340 }, flexDirection: { xs: "column", sm: "row" } }}>
                  <Box sx={{ width: { xs: "100%", sm: 170 }, flexShrink: 0, overflowY: { xs: "hidden", sm: "auto" }, overflowX: { xs: "auto", sm: "hidden" }, display: "flex", flexDirection: { xs: "row", sm: "column" }, gap: { xs: 1, sm: 0 }, pb: { xs: 1, sm: 0 }, '&::-webkit-scrollbar': { height: 4, width: 4 } }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.7px", mb: { xs: 0, sm: 1 }, mr: { xs: 2, sm: 0 }, display: { xs: "flex", sm: "block" }, alignItems: "center", px: 0.5 }}>Modules</Typography>
                    {MODULES.map(mod => {
                      const has = Object.values(modulePerms[mod] || {}).some(Boolean);
                      return (
                        <Box key={mod} onClick={() => setActiveMod(mod)} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.9, borderRadius: 2, mb: { xs: 0, sm: 0.4 }, whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer", transition: "all 0.12s", background: activeModule === mod ? alpha(BLUE, 0.08) : "transparent", "&:hover": { background: alpha(BLUE, 0.05) } }}>
                          <FolderOpenIcon sx={{ fontSize: 14, color: activeModule === mod ? BLUE : "#94A3B8" }} />
                          <Typography variant="body2" fontWeight={activeModule === mod ? 700 : 500} color={activeModule === mod ? BLUE : "text.primary"} sx={{ flex: 1, fontSize: "0.8rem" }}>{mod}</Typography>
                          {has && <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />}
                        </Box>
                      );
                    })}
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: BORDER, display: { xs: "none", sm: "block" } }} />
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <TextField fullWidth size="small" placeholder="Search permissions..." value={permSearch} onChange={e => setPermSearch(e.target.value)} sx={{ mb: 1.5 }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "#94A3B8" }} /></InputAdornment> }} />
                    <Box sx={{ overflowY: "auto", flex: 1 }}>
                      {PERMISSIONS.filter(p => p.label.toLowerCase().includes(permSearch.toLowerCase())).map(perm => (
                        <PermRow key={perm.key} perm={perm} checked={!!getActiveP()[perm.key]} onChange={() => togglePerm(activeModule, perm.key)} />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, p: 1.5, background: SURFACE, borderRadius: 2, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <BarChartIcon sx={{ fontSize: 15, color: "#94A3B8" }} />
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Selected:</Typography>
                  {Object.entries(modulePerms).filter(([, m]) => Object.values(m).some(Boolean)).map(([mod, m]) => (
                    <Chip key={mod} label={`${mod}: ${Object.values(m).filter(Boolean).length}`} size="small" sx={{ fontSize: "0.65rem", height: 20, background: BLUE_PALE, color: BLUE, fontWeight: 700 }} />
                  ))}
                  {totalSelected === 0 && <Typography variant="caption" color="text.disabled">None yet</Typography>}
                </Box>
              </Box>
            )}


            {/* STEP 3 - Review & Done - Updated with Toggle Button for Status */}
            {step === (isAdmin ? 1 : 2) && (
              <Box>
                <Box sx={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 100%)`, borderRadius: 3, p: 2.5, mb: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 50, height: 50, borderRadius: 3, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldIcon sx={{ color: "#fff", fontSize: 26 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#fff" }}>{roleName || "Untitled Role"}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }}>{roleDesc || "No description provided."}</Typography>
                  </Box>
                  {/* Changed from Chip to ToggleButton for status */}
                  <ToggleButtonGroup
                    value={roleStatus}
                    exclusive
                    onChange={(e, newStatus) => {
                      if (newStatus !== null) {
                        setRoleStatus(newStatus);
                      }
                    }}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      padding: "3px",
                      "& .MuiToggleButtonGroup-grouped": {
                        border: 0,
                        "&.Mui-disabled": { border: 0 },
                        "&:not(:first-of-type)": { borderRadius: "18px" },
                        "&:first-of-type": { borderRadius: "18px" }
                      },
                      "& .MuiToggleButton-root": {
                        color: "rgba(255,255,255,0.6)",
                        py: 0.6,
                        px: 2,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        transition: "all 0.2s ease-in-out",
                        "&.Mui-selected": {
                          backgroundColor: roleStatus === "Active" ? "#10B981" : "#EF4444",
                          color: "#fff",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          "&:hover": {
                            backgroundColor: roleStatus === "Active" ? "#059669" : "#DC2626",
                          }
                        },
                        "&:hover:not(.Mui-selected)": {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#fff",
                        }
                      }
                    }}
                  >
                    <ToggleButton value="Active">ACTIVE</ToggleButton>
                    <ToggleButton value="Inactive">INACTIVE</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                  <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: 2.5, p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.6px", mb: 1.5, display: "block" }}>Configuration</Typography>
                    {[
                      { icon: <AdminPanelSettingsIcon sx={{ fontSize: 15 }} />, label: "Access Level", val: isAdmin ? "Administrator" : "Standard User", col: isAdmin ? "#F59E0B" : "#64748B" },
                      { icon: <CheckCircleIcon sx={{ fontSize: 15 }} />, label: "Status", val: roleStatus, col: roleStatus === "Active" ? "#10B981" : "#EF4444" },
                      { icon: <BarChartIcon sx={{ fontSize: 15 }} />, label: "Total Perms", val: isAdmin ? "Full Access" : totalSelected, col: isAdmin ? "#F59E0B" : BLUE },
                    ].map(({ icon, label, val, col }) => (
                      <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                        <Box sx={{ width: 28, height: 28, borderRadius: 1.5, background: alpha(col, 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: col }}>{icon}</Box>
                        <Box><Typography variant="caption" color="text.secondary" display="block">{label}</Typography><Typography variant="body2" fontWeight={700} color={col}>{val}</Typography></Box>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: 2.5, p: 2, overflowY: "auto", maxHeight: 220 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.6px", mb: 1.5, display: "block" }}>Permissions</Typography>
                    {isAdmin ? (
                      <Box sx={{ textAlign: "center", pt: 2 }}>
                        <AdminPanelSettingsIcon sx={{ fontSize: 30, color: "#F59E0B" }} />
                        <Typography variant="body2" fontWeight={700} color="#F59E0B" sx={{ mt: 0.5 }}>Full System Access</Typography>
                        <Typography variant="caption" color="text.secondary">Admin role inherits all permissions.</Typography>
                      </Box>
                    ) : Object.entries(modulePerms).filter(([, m]) => Object.values(m).some(Boolean)).length === 0 ? (
                      <Typography variant="caption" color="text.disabled" sx={{ display: "block", textAlign: "center", mt: 2 }}>No permissions selected</Typography>
                    ) : (
                      Object.entries(modulePerms).filter(([, m]) => Object.values(m).some(Boolean)).map(([mod, m]) => (
                        <Box key={mod} sx={{ mb: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                            <FolderOpenIcon sx={{ fontSize: 12, color: BLUE }} />
                            <Typography variant="caption" fontWeight={700} color={BLUE}>{mod}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, ml: 2 }}>
                            {Object.entries(m).filter(([, v]) => v).map(([k]) => {
                              const p = PERMISSIONS.find(pp => pp.key === k);
                              return <Chip key={k} label={p?.label || k} size="small" sx={{ fontSize: "0.63rem", height: 18, background: alpha("#64748B", 0.1), color: "#64748B", fontWeight: 600 }} />;
                            })}
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>

          <Box sx={{ px: { xs: 2.5, sm: 3.5 }, py: 2.2, borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", background: "#FAFBFC" }}>
            {step > 0
              ? <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => setStep(s => s - 1)} sx={{ borderColor: BORDER, color: "text.secondary" }}>Back</Button>
              : <Button variant="outlined" onClick={() => { setCreateOpen(false); resetForm(); }} sx={{ borderColor: BORDER, color: "text.secondary" }}>Cancel</Button>}

            {/* Next/Save button with conditional step handling */}
            {step < (isAdmin ? 1 : 2)
              ? <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  if (step === 0 && isDuplicateName) {
                    toast("Role name already exists", "error");
                    return;
                  }
                  if (step === 0 && isEditing && targetRole?.isDuplicated && targetRole?.status === "Inactive" && roleName.trim().endsWith("(Copy)")) {
                    toast("Please change the default role name before proceeding", "warning");
                    return;
                  }
                  if (step === 0 && isAdmin) {
                    // If admin role, skip directly to review step (step 1 for admin)
                    setStep(1);
                  } else {
                    setStep(s => s + 1);
                  }
                }}
                disabled={!canNext}>
                Next
              </Button>
              : <Button variant="contained" startIcon={<SaveIcon />} onClick={() => {
                if (step === 0 && isDuplicateName) {
                  toast("Role name already exists", "error");
                  return;
                } if (isEditing && targetRole?.isDuplicated && targetRole?.status === "Inactive" && roleName.trim().endsWith("(Copy)")) {
                  toast("Please change the default role name before saving", "warning");
                  setStep(0);
                  return;
                }
                submitRole();
              }} sx={{ px: 3 }}>{isEditing ? "Save Changes" : "Create Role"}</Button>}
          </Box>
        </Dialog>

        {/* VIEW DETAILS DIALOG */}
        <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <Box sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid #EEF3F9" }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, background: alpha(BLUE_ACC, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldIcon sx={{ color: BLUE_ACC, fontSize: 18 }} />
            </Box>
            <Typography variant="h6">Role Details</Typography>
            <IconButton onClick={() => setViewOpen(false)} size="small" sx={{ ml: "auto", color: "#94A3B8" }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          {targetRole && (
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <InfoIcon sx={{ fontSize: 14, color: "#64748B" }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.6px" }}>Basic Information</Typography>
              </Box>
              {[{ label: "Role Name", val: targetRole.name }, { label: "Description", val: targetRole.description }].map(({ label, val }) => (
                <Box key={label} sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>{label}:</Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary">{val}</Typography>
                </Box>
              ))}
              <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>Status:</Typography>
                <Chip label={targetRole.status} size="small" sx={{ background: targetRole.status === "Active" ? "#ECFDF5" : "#FEF2F2", color: targetRole.status === "Active" ? "#10B981" : "#EF4444", border: `1px solid ${targetRole.status === "Active" ? "#A7F3D0" : "#FECACA"}`, height: 22 }} />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>Type:</Typography>
                <Chip label={targetRole.isAdmin ? "Administrator" : "Standard"} size="small"
                  sx={{ background: targetRole.isAdmin ? "#FFFBEB" : BLUE_PALE, color: targetRole.isAdmin ? "#B45309" : BLUE_ACC, border: `1px solid ${targetRole.isAdmin ? "#FDE68A" : BLUE_MID}`, height: 22 }} />
              </Box>
              <Divider sx={{ mb: 2, borderColor: "#EEF3F9" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: "#64748B" }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.6px" }}>Timeline Information</Typography>
              </Box>
              {[
                { label: "Created Date", val: targetRole.createdDate, icon: <CalendarTodayIcon sx={{ fontSize: 13 }} /> },
                { label: "Last Updated", val: targetRole.updatedDate || targetRole.createdDate, icon: <AccessTimeIcon sx={{ fontSize: 13 }} /> }
              ].map(({ label, val, icon }) => (
                <Box key={label} sx={{ display: "flex", gap: 2, mb: 1.2, alignItems: "center" }}>
                  <Box sx={{ width: 100, flexShrink: 0, display: "flex", alignItems: "center", gap: 0.6, color: "#64748B" }}>{icon}<Typography variant="body2" color="text.secondary">{label}:</Typography></Box>
                  <Typography variant="body2" fontWeight={600} color="text.primary">{val}</Typography>
                </Box>
              ))}
            </DialogContent>
          )}
          <Box sx={{ px: 3, py: 2, borderTop: "1px solid #EEF3F9", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, background: "#FAFCFE" }}>
            <Button variant="outlined" onClick={() => setViewOpen(false)} sx={{ borderColor: "#E2E8F0", color: "text.secondary", flex: 1 }}>Close</Button>
            <Button variant="contained" startIcon={<EditIcon sx={{ fontSize: 15 }} />} onClick={() => { setViewOpen(false); openEdit(targetRole); }} sx={{ flex: 1 }}>Edit Role</Button>
            {!(targetRole?.isDuplicated && targetRole?.status === "Inactive") && (
              <Button variant="contained" startIcon={<VpnKeyIcon sx={{ fontSize: 15 }} />} onClick={() => { setViewOpen(false); openEdit(targetRole); setTimeout(() => setStep(1), 80); }} sx={{ flex: 1, background: "#7C3AED", "&:hover": { background: "#6D28D9" } }}>Manage</Button>
            )}
          </Box>
        </Dialog>

        {/* DELETE DIALOG */}
        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <Box sx={{ p: 3.5, textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "50%", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
              <DeleteOutlineIcon sx={{ fontSize: 28, color: "#EF4444" }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Delete Role?</Typography>
            <Typography variant="body2" color="text.secondary">Are you sure you want to delete <strong>{targetRole?.name}</strong>? This action cannot be undone.</Typography>
            <Box sx={{ display: "flex", gap: 1.5, mt: 3, justifyContent: "center" }}>
              <Button variant="outlined" onClick={() => setDeleteOpen(false)} sx={{ borderColor: BORDER, color: "text.secondary", minWidth: 100 }}>Cancel</Button>
              <Button variant="contained" color="error" onClick={confirmDelete} sx={{ minWidth: 100 }}>Delete</Button>
            </Box>
          </Box>
        </Dialog>

        {/* SNACKBAR */}
        <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert severity={snack.severity} variant="filled" sx={{ borderRadius: 2, fontWeight: 600 }} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.msg}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}