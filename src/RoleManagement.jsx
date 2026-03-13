import { useState } from "react";
import {
  Box, Typography, Button, TextField, Checkbox,
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Stepper,
  Step, StepLabel, InputAdornment, Tooltip, Switch, Divider,
  Card, CardContent, Grid, Collapse, Alert, Snackbar,
  Avatar, Stack, Menu, ListItemIcon, ListItemText
} from "@mui/material";
import {
  Add as AddIcon, Search as SearchIcon, Close as CloseIcon,
  Edit as EditIcon, Delete as DeleteIcon,
  Shield as ShieldIcon, CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon,
  AdminPanelSettings as AdminIcon,
  ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon,
  ManageAccounts as ManageAccountsIcon, Save as SaveIcon,
  NavigateBefore as PrevIcon, NavigateNext as NextIcon,
  MoreVert as MoreIcon, Visibility as ViewIcon,
  VpnKey as KeyIcon, InfoOutlined as InfoIcon,
  AccessTime as TimeIcon, HistoryEdu as HistoryIcon,
  Today as CalendarIcon,
  FactCheck as ApproveIcon, Cancel as RejectIcon,
  FileUpload as UploadIcon, FileDownload as DownloadIcon,
  Print as PrintIcon, Edit as EditActionIcon,
  Delete as DeleteActionIcon, Group as AssignIcon, Group as GroupIcon,
  Description as GenerateIcon, IosShare as ExportIcon,
  FolderOpen as FolderIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

// ─── Palette ────────────────────────────────────────────────────────────────
const palette = {
  primary: {
    main: "#3B7395",
    50: "#EDF4F8", 100: "#D6E6F0", 200: "#ADCDE1", 300: "#84B3D2",
    400: "#5B9AC3", 500: "#3B7395", 600: "#315F7A", 700: "#264B5F",
    800: "#1C3744", 900: "#122329",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#152433",
    50: "#E3EDF3", 100: "#B9CEDB", 200: "#8EAFC3", 300: "#6390AB",
    400: "#3F7897", 500: "#0d2438", 600: "#0b2031", 700: "#091a29",
    800: "#071521", 900: "#050f18",
    contrastText: "#ffffff",
  },
  tertiary: {
    main: "#AFC7D6",
    50: "#F4F8FB", 100: "#E6EFF5", 200: "#D8E6EF", 300: "#CADDE9",
    400: "#BCD4E3", 500: "#AFC7D6", 600: "#8FAFBE", 700: "#6F97A6",
    800: "#4F7F8E", 900: "#2F6776",
    contrastText: "#000000",
  },
  background: { default: "#F7FAFC", paper: "#FFFFFF" },
  text: { primary: "#1C1C1C", secondary: "#5A6B75" },
};

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
    text: palette.text,
    divider: "rgba(0,0,0,0.08)",
    action: { hover: "rgba(0,0,0,0.04)", selected: "rgba(59,115,149,0.12)" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Poppins', 'DM Sans', sans-serif",
    h5: { fontWeight: 700, letterSpacing: -0.5 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "8px 18px" },
        containedPrimary: {
          background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary[400]})`,
          boxShadow: "0 4px 14px rgba(59,115,149,0.35)",
          "&:hover": { boxShadow: "0 6px 20px rgba(59,115,149,0.5)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 700, fontSize: 11, letterSpacing: 0.8,
            textTransform: "uppercase",
            color: palette.text.secondary,
            backgroundColor: palette.primary[50],
          },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600, fontSize: 11 } } },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.secondary.main,
          transition: "all 0.2s ease",
          "&:hover": { color: palette.primary.main },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: palette.primary[200] },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: palette.primary.main },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: palette.primary.main, borderWidth: "1.5px" },
        },
        input: { padding: "10px 14px", fontSize: 14 },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { padding: "10px 14px", fontSize: 14, fontWeight: 600 },
      },
    },
  },
});

// ─── Shared Components ───────────────────────────────────────────────────────
function FormField({ label, required, children, error }) {
  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography variant="body2" fontWeight={600} color="#334155" mb={1} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {label} {required && <Box component="span" sx={{ color: "#ef4444" }}>*</Box>}
        </Typography>
      )}
      {children}
      {error && <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1, fontWeight: 500 }}>{error}</Typography>}
    </Box>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const MODULES = [
  { id: "announcements", label: "Announcements", icon: "📢", description: "Company announcements", actions: ["view", "create", "edit", "delete", "approve", "reject"] },
  { id: "appraisal", label: "Appraisal", icon: "⭐", description: "Performance appraisals", actions: ["view", "create", "edit", "generate", "export"] },
  { id: "bank", label: "Bank", icon: "🏦", description: "Bank details and statements", actions: ["view", "upload", "download", "print"] },
  { id: "company", label: "Company", icon: "🏢", description: "Company settings", actions: ["view", "edit", "assign", "export"] },
  { id: "dashboard", label: "Dashboard", icon: "📊", description: "Analytics and overview", actions: ["view", "export"] },
  { id: "hr_employees", label: "HR Employees", icon: "👥", description: "Employee management", actions: ["view", "create", "edit", "delete", "assign"] },
  { id: "user_management", label: "User Management", icon: "👤", description: "User accounts", actions: ["view", "create", "edit", "delete"] },
  { id: "reports", label: "Reports", icon: "📈", description: "Generate reports", actions: ["view", "generate", "export", "print", "download"] },
  { id: "payroll", label: "Payroll", icon: "💰", description: "Payroll management", actions: ["view", "create", "edit", "approve", "reject", "export"] },
  { id: "custom_modules", label: "Custom Modules", icon: "🔧", description: "Custom configurations", actions: ["view", "create", "edit", "delete", "upload"] },
];

const ACTION_STYLES = {
  view: { color: palette.primary.main, bg: palette.primary[50], icon: <ViewIcon fontSize="inherit" /> },
  create: { color: palette.primary.main, bg: palette.primary[50], icon: <AddIcon fontSize="inherit" /> },
  edit: { color: palette.primary.main, bg: palette.primary[50], icon: <EditActionIcon fontSize="inherit" /> },
  delete: { color: palette.primary.main, bg: palette.primary[50], icon: <DeleteActionIcon fontSize="inherit" /> },
  approve: { color: palette.primary.main, bg: palette.primary[50], icon: <ApproveIcon fontSize="inherit" /> },
  reject: { color: palette.primary.main, bg: palette.primary[50], icon: <RejectIcon fontSize="inherit" /> },
  upload: { color: palette.primary.main, bg: palette.primary[50], icon: <UploadIcon fontSize="inherit" /> },
  download: { color: palette.primary.main, bg: palette.primary[50], icon: <DownloadIcon fontSize="inherit" /> },
  print: { color: palette.primary.main, bg: palette.primary[50], icon: <PrintIcon fontSize="inherit" /> },
  assign: { color: palette.primary.main, bg: palette.primary[50], icon: <AssignIcon fontSize="inherit" /> },
  generate: { color: palette.primary.main, bg: palette.primary[50], icon: <GenerateIcon fontSize="inherit" /> },
  export: { color: palette.primary.main, bg: palette.primary[50], icon: <ExportIcon fontSize="inherit" /> },
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color = "text.primary" }) {
  return (
    <Card elevation={0} sx={{ border: `1px solid ${palette.primary[100]}`, flex: 1, borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}
          textTransform="uppercase" letterSpacing={0.5} display="block" mb={0.5}>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={800} color={color}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

// ─── PermissionCard ───────────────────────────────────────────────────────────
function PermissionCard({ module, selectedPerms, onToggle }) {
  const [expanded, setExpanded] = useState(true);
  const selectedCount = module.actions.filter(a => selectedPerms[`${module.id}_${a}`]).length;

  const handleSelectAll = () => {
    const allSelected = selectedCount === module.actions.length;
    module.actions.forEach(a => onToggle(`${module.id}_${a}`, !allSelected));
  };

  return (
    <Box sx={{ border: `1px solid ${palette.primary[100]}`, borderRadius: 2, mb: 1.5, overflow: "hidden" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2.5, py: 1.5, bgcolor: palette.primary[50], cursor: "pointer"
      }}
        onClick={() => setExpanded(e => !e)}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(palette.primary.main, 0.12), fontSize: 16 }}>
            {module.icon}
          </Avatar>
          <Box>
            <Typography fontWeight={700} fontSize={14}>{module.label}</Typography>
            <Typography variant="caption" color="text.secondary">{module.description}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip label={`${selectedCount}/${module.actions.length}`} size="small"
            sx={{
              bgcolor: selectedCount > 0 ? alpha(palette.primary.main, 0.12) : "#e2e8f0",
              color: selectedCount > 0 ? palette.primary.main : "text.secondary", fontWeight: 700
            }} />
          <Button size="small" onClick={e => { e.stopPropagation(); handleSelectAll(); }}
            sx={{
              fontSize: 11, py: 0.25, minWidth: "auto", color: "text.secondary",
              "&:hover": { color: palette.primary.main }
            }}>
            {selectedCount === module.actions.length ? "Deselect All" : "Select All"}
          </Button>
          {expanded
            ? <ExpandLessIcon fontSize="small" sx={{ color: "text.secondary" }} />
            : <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        </Stack>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {module.actions.map(action => {
            const key = `${module.id}_${action}`;
            const checked = !!selectedPerms[key];
            const style = ACTION_STYLES[action] || ACTION_STYLES.view;
            return (
              <Box key={action} onClick={() => onToggle(key, !checked)}
                sx={{
                  display: "flex", alignItems: "center", gap: 1, px: 2, py: 1,
                  border: `2px solid ${checked ? style.color : "#e2e8f0"}`,
                  borderRadius: 2, cursor: "pointer", transition: "all 0.15s",
                  bgcolor: checked ? style.bg : "white",
                  "&:hover": { borderColor: style.color, bgcolor: style.bg },
                }}>
                <Checkbox size="small" checked={checked}
                  sx={{ p: 0, color: style.color, "&.Mui-checked": { color: style.color } }} />
                <Box>
                  <Typography fontSize={12} fontWeight={700} color={style.color}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </Typography>
                  <Chip label={style.label} size="small"
                    sx={{
                      height: 16, fontSize: 9, bgcolor: style.bg, color: style.color,
                      fontWeight: 700, "& .MuiChip-label": { px: 0.75 }
                    }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}

// ─── Pagination Footer ────────────────────────────────────────────────────────
function PaginationFooter({ total, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const from = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, total);

  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      px: 2.5, py: 1.5, borderTop: `1px solid ${palette.primary[100]}`,
      bgcolor: palette.primary[50],
    }}>
      {/* Showing X to Y of Z entries */}
      <Typography variant="caption" color="text.secondary" fontSize={13}>
        Showing{" "}
        <Box component="span" fontWeight={600} color={palette.primary.main}>{from}</Box>
        {" "}to{" "}
        <Box component="span" fontWeight={600} color={palette.primary.main}>{to}</Box>
        {" "}of{" "}
        <Box component="span" fontWeight={600} color={palette.primary.main}>{total}</Box>
        {" "}entries
      </Typography>

      {/* Right side: Previous / page btn / Next */}
      <Stack direction="row" alignItems="center" spacing={1.5}>

        {/* Previous */}
        <Button
          size="small" variant="outlined"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          sx={{
            height: 34, minWidth: 90, fontSize: 13, borderRadius: 2,
            borderColor: palette.primary[200],
            color: palette.secondary.main,
            "&:hover": { borderColor: palette.primary.main, bgcolor: palette.primary[50] },
            "&.Mui-disabled": { borderColor: "#e2e8f0", color: "#b0b8c0" },
          }}>
          Previous
        </Button>

        {/* Page number button */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
            acc.push(p);
            return acc;
          }, [])
          .map((p, idx) =>
            p === "..." ? (
              <Typography key={`ellipsis-${idx}`} fontSize={13} color="text.secondary" px={0.5}>…</Typography>
            ) : (
              <Button
                key={p}
                size="small"
                onClick={() => onPageChange(p)}
                variant={p === page ? "contained" : "outlined"}
                sx={{
                  height: 34, minWidth: 34, px: 0, fontSize: 13, borderRadius: 2,
                  ...(p === page
                    ? {
                      bgcolor: palette.secondary.main,
                      color: "#fff",
                      border: "none",
                      "&:hover": { bgcolor: palette.secondary[600] },
                    }
                    : {
                      borderColor: palette.primary[200],
                      color: palette.secondary.main,
                      "&:hover": { borderColor: palette.primary.main, bgcolor: palette.primary[50] },
                    }),
                }}>
                {p}
              </Button>
            )
          )}

        {/* Next */}
        <Button
          size="small" variant="outlined"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          sx={{
            height: 34, minWidth: 70, fontSize: 13, borderRadius: 2,
            borderColor: palette.primary[200],
            color: palette.secondary.main,
            "&:hover": { borderColor: palette.primary.main, bgcolor: palette.primary[50] },
            "&.Mui-disabled": { borderColor: "#e2e8f0", color: "#b0b8c0" },
          }}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

// ─── RowActions (Teardrop Menu) ───────────────────────────────────────────────
function RowActions({ role, onView, onEdit, onManagePerms, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
          }
        }}
      >
        <MenuItem onClick={() => { handleClose(); onView(); }} sx={{ py: 1 }}>
          <ListItemIcon><ViewIcon fontSize="small" sx={{ color: "text.secondary" }} /></ListItemIcon>
          <ListItemText primary="View Details" primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); onEdit(); }} sx={{ py: 1 }}>
          <ListItemIcon><EditIcon fontSize="small" sx={{ color: "#3B82F6" }} /></ListItemIcon>
          <ListItemText primary="Edit Role" primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#3B82F6" }} />
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); onManagePerms(); }} sx={{ py: 1 }}>
          <ListItemIcon><KeyIcon fontSize="small" sx={{ color: "#8B5CF6" }} /></ListItemIcon>
          <ListItemText primary="Manage Permissions" primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#8B5CF6" }} />
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => { handleClose(); onDelete(); }} sx={{ py: 1 }}>
          <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: "#EF4444" }} /></ListItemIcon>
          <ListItemText primary="Delete Role" primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#EF4444" }} />
        </MenuItem>
      </Menu>
    </>
  );
}

// ─── RoleDetailsDialog ────────────────────────────────────────────────────────
function RoleDetailsDialog({ open, onClose, role, onEdit, onManagePerms }) {
  if (!role) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ py: 2, px: 3, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: alpha(palette.primary.main, 0.1), width: 36, height: 36 }}>
              <ShieldIcon sx={{ color: palette.primary.main, fontSize: 20 }} />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>Role Details</Typography>
          </Stack>
          <IconButton size="small" onClick={onClose} sx={{ bgcolor: "rgba(0,0,0,0.03)" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Basic Info */}
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <InfoIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Typography fontWeight={700} fontSize={15}>Basic Information</Typography>
          </Stack>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}><Typography color="text.secondary" fontSize={14}>Role Name:</Typography></Grid>
              <Grid item xs={8}><Typography fontWeight={700} fontSize={14} color={palette.secondary.main}>{role.name}</Typography></Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={4}><Typography color="text.secondary" fontSize={14}>Description:</Typography></Grid>
              <Grid item xs={8}><Typography fontSize={14}>{role.description || "No description provided"}</Typography></Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}><Typography color="text.secondary" fontSize={14}>Status:</Typography></Grid>
              <Grid item xs={8}>
                <Chip label={role.status} size="small" icon={<CheckCircleIcon sx={{ fontSize: "14px !important" }} />}
                  sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 700, fontSize: 12 }} />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}><Typography color="text.secondary" fontSize={14}>Type:</Typography></Grid>
              <Grid item xs={8}>
                <Chip label={role.isAdmin ? "Administrator" : "Standard"} size="small"
                  sx={{ bgcolor: role.isAdmin ? "#dbeafe" : "#f1f5f9", color: role.isAdmin ? "#2563eb" : "#64748b", fontWeight: 700, fontSize: 12 }} />
              </Grid>
            </Grid>
          </Stack>

          {/* Timeline Info */}
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <TimeIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            <Typography fontWeight={700} fontSize={15}>Timeline Information</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}><Stack direction="row" spacing={1} alignItems="center"><CalendarIcon sx={{ fontSize: 18, color: "text.secondary" }} /><Typography color="text.secondary" fontSize={14}>Created Date:</Typography></Stack></Grid>
              <Grid item xs={8}><Typography fontSize={14}>{role.createdAt} at 09:00 AM</Typography></Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}><Stack direction="row" spacing={1} alignItems="center"><TimeIcon sx={{ fontSize: 18, color: "text.secondary" }} /><Typography color="text.secondary" fontSize={14}>Last Updated:</Typography></Stack></Grid>
              <Grid item xs={8}><Typography fontSize={14}>{role.createdAt} at 09:00 AM</Typography></Grid>
            </Grid>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ px: 3, borderRadius: 2 }}>Close</Button>
        <Button onClick={() => { onClose(); onEdit(); }} variant="contained" startIcon={<EditIcon />}
          sx={{ bgcolor: palette.secondary.main, "&:hover": { bgcolor: palette.secondary[600] }, borderRadius: 2, px: 3 }}>
          Edit Role
        </Button>
        <Button onClick={() => { onClose(); onManagePerms(); }} variant="contained" startIcon={<KeyIcon />}
          sx={{ bgcolor: "#8B5CF6", "&:hover": { bgcolor: "#7c3aed" }, borderRadius: 2, px: 3, color: "#fff" }}>
          Manage Permissions
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RoleManagement() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Manager", description: "", status: "Active", isAdmin: false, permissions: {}, createdAt: "3/13/2026" },
    { id: 2, name: "Staff", description: "", status: "Active", isAdmin: false, permissions: {}, createdAt: "3/13/2026" },
  ]);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [editingRole, setEditingRole] = useState(null);
  const [viewingRole, setViewingRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Form state
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [roleStatus, setRoleStatus] = useState("Active");
  const [isAdmin, setIsAdmin] = useState(false);
  const [permissions, setPermissions] = useState({});
  const [permSearch, setPermSearch] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState(MODULES[0].id);
  const [errors, setErrors] = useState({});

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRoles(pagedRoles.map(role => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  // Handle individual row checkbox
  const handleSelectRow = (roleId) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRoles.length === 0) return;
    
    setRoles(prev => prev.filter(role => !selectedRoles.includes(role.id)));
    setSelectedRoles([]);
    setSnackbar({ 
      open: true, 
      message: `${selectedRoles.length} role(s) deleted successfully.`, 
      severity: "success" 
    });
  };

  const openCreate = () => {
    setEditingRole(null);
    setRoleName(""); setRoleDesc(""); setRoleStatus("Active");
    setIsAdmin(false); setPermissions({});
    setActiveStep(0); setErrors({}); setSelectedModuleId(MODULES[0].id);
    setDialogOpen(true);
  };

  const openEdit = role => {
    setEditingRole(role);
    setRoleName(role.name); setRoleDesc(role.description);
    setRoleStatus(role.status); setIsAdmin(role.isAdmin);
    setPermissions({ ...role.permissions });
    setActiveStep(0); setErrors({}); setSelectedModuleId(MODULES[0].id);
    setDialogOpen(true);
  };

  const closeDialog = () => { setDialogOpen(false); setEditingRole(null); };

  const validateStep1 = () => {
    const e = {};
    if (!roleName.trim()) e.roleName = "Role name is required";
    else if (!/^[a-zA-Z ]+$/.test(roleName.trim())) e.roleName = "Letters and spaces only";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const steps = isAdmin
    ? ["Role Details", "Review & Done"]
    : ["Role Details", "Manage Permissions", "Review & Done"];

  const handleNext = () => {
    if (activeStep === 0 && !validateStep1()) return;
    setActiveStep(s => s + 1);
  };
  const handleBack = () => setActiveStep(s => s - 1);

  const handlePermToggle = (key, val) => setPermissions(p => ({ ...p, [key]: val }));

  const handleSave = () => {
    if (editingRole) {
      setRoles(r => r.map(x => x.id === editingRole.id
        ? { ...x, name: roleName, description: roleDesc, status: roleStatus, isAdmin, permissions }
        : x));
      setSnackbar({ open: true, message: "Role updated successfully!", severity: "success" });
    } else {
      setRoles(r => [...r, {
        id: Date.now(), name: roleName, description: roleDesc,
        status: roleStatus, isAdmin, permissions, createdAt: new Date().toLocaleDateString(),
      }]);
      setSnackbar({ open: true, message: "Role created successfully!", severity: "success" });
    }
    closeDialog();
  };

  const handleDelete = id => {
    setRoles(r => r.filter(x => x.id !== id));
    setSnackbar({ open: true, message: "Role deleted.", severity: "info" });
  };

  // Filter
  const filteredRoles = roles.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Paginated slice
  const pagedRoles = filteredRoles.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const filteredModules = MODULES.filter(m =>
    m.label.toLowerCase().includes(permSearch.toLowerCase())
  );

  const totalSelected = Object.values(permissions).filter(Boolean).length;
  const activeRoles = roles.filter(r => r.status === "Active").length;
  const inactiveRoles = roles.filter(r => r.status === "Inactive").length;
  const adminRoles = roles.filter(r => r.isAdmin).length;

  // Reset to page 1 whenever filter/search changes
  const handleSearchChange = v => { setSearchQuery(v); setPage(1); };
  const handleStatusChange = v => { setStatusFilter(v); setPage(1); };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F7FAFC", p: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" color={palette.secondary.main}>Role Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} size="large"
            sx={{ color: "#fff" }}>
            Create Role
          </Button>
        </Stack>

        {/* Stat Cards */}
        <Stack direction="row" spacing={2} mb={3}>
          <StatCard label="Total Roles" value={roles.length} />
          <StatCard label="Active Roles" value={activeRoles} color={palette.primary.main} />
          <StatCard label="Inactive Roles" value={inactiveRoles} color="error.main" />
          <StatCard label="Admin Roles" value={adminRoles} color={palette.secondary.main} />
        </Stack>

        {/* Table Card */}
        <Paper elevation={0} sx={{ border: `1px solid ${palette.primary[100]}`, borderRadius: 3, overflow: "hidden" }}>
          {/* Toolbar */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} pb={1.5} spacing={3}>
            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
              <TextField
                fullWidth
                placeholder="Search by role name or description..."
                value={searchQuery} onChange={e => handleSearchChange(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "#94A3B8" }} />
                    </InputAdornment>
                  ),
                }} />
            </Box>

            <Stack direction="row" alignItems="center" spacing={2.5}>
              {/* Delete Button - Only shows when at least one role is selected */}
              {selectedRoles.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleBulkDelete}
                  size="small"
                  sx={{
                    height: 40,
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    "&:hover": {
                      borderColor: "#dc2626",
                      bgcolor: "#fee2e2",
                    },
                  }}
                >
                  Delete ({selectedRoles.length})
                </Button>
              )}

              <Box sx={{ minWidth: 150 }}>
                <Select
                  fullWidth
                  size="small"
                  value={rowsPerPage}
                  onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                  renderValue={v => `${v} per page`}
                  sx={{ height: 40 }}>
                  {ROWS_PER_PAGE_OPTIONS.map(n => (
                    <MenuItem key={n} value={n}>{n} per page</MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ minWidth: 150 }}>
                <Select
                  fullWidth
                  size="small"
                  value={statusFilter}
                  onChange={e => handleStatusChange(e.target.value)}
                  sx={{ height: 40 }}>
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </Box>
            </Stack>
          </Stack>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox 
                      size="small"
                      indeterminate={selectedRoles.length > 0 && selectedRoles.length < pagedRoles.length}
                      checked={pagedRoles.length > 0 && selectedRoles.length === pagedRoles.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>S.No</TableCell>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Admin Type</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedRoles.map((role, idx) => {
                  const permCount = Object.values(role.permissions).filter(Boolean).length;
                  const rowNum = (page - 1) * rowsPerPage + idx + 1;
                  return (
                    <TableRow key={role.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell padding="checkbox">
                        <Checkbox 
                          size="small"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => handleSelectRow(role.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>{rowNum}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ShieldIcon fontSize="small" sx={{ color: palette.primary.main, opacity: 0.7 }} />
                          <Typography fontWeight={600} fontSize={14}>{role.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                        {role.description || "No description"}
                      </TableCell>
                      <TableCell>
                        <Chip label={role.status} size="small" icon={<CheckCircleIcon />}
                          sx={{
                            bgcolor: role.status === "Active" ? "#dcfce7" : "#fee2e2",
                            color: role.status === "Active" ? "#16a34a" : "#dc2626",
                          }} />
                      </TableCell>
                      <TableCell>
                        <Chip label={role.isAdmin ? "Yes" : "No"} size="small"
                          sx={{
                            bgcolor: role.isAdmin ? alpha(palette.secondary.main, 0.1) : "#f1f5f9",
                            color: role.isAdmin ? palette.secondary.main : "text.secondary",
                          }} />
                      </TableCell>
                      <TableCell>
                        <Chip label={`${permCount} permissions`} size="small"
                          sx={{
                            bgcolor: permCount > 0 ? alpha(palette.primary.main, 0.1) : "#f1f5f9",
                            color: permCount > 0 ? palette.primary.main : "text.secondary",
                          }} />
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>{role.createdAt}</TableCell>
                      <TableCell>
                        <RowActions
                          role={role}
                          onView={() => { setViewingRole(role); setDetailsOpen(true); }}
                          onEdit={() => openEdit(role)}
                          onManagePerms={() => { openEdit(role); setActiveStep(1); }}
                          onDelete={() => handleDelete(role.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {pagedRoles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 5, color: "text.secondary" }}>
                      No roles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ─── Pagination Footer ─── */}
          <PaginationFooter
            total={filteredRoles.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </Paper>

        {/* ─── Create / Edit Dialog ─── */}
        <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth
          PaperProps={{ sx: { maxHeight: "90vh" } }}>
          <DialogTitle sx={{ pb: 0, pt: 3, px: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#F1F5F9", width: 44, height: 44 }}>
                  <ManageAccountsIcon sx={{ color: "#475569", fontSize: 24 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} color={palette.secondary.main}>
                    {editingRole ? "Edit Current Role" : "Create New Role"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activeStep === 0
                      ? "Step 1: Fill in role details"
                      : activeStep === 1
                        ? "Step 2: Manage permissions"
                        : "Step 3: Review & confirm"}
                  </Typography>
                </Box>
              </Stack>
              <IconButton onClick={closeDialog} size="small" sx={{ bgcolor: "rgba(0,0,0,0.04)" }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 2 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={({ active, completed }) => {
                      if (completed) return <Avatar sx={{ width: 28, height: 28, bgcolor: palette.primary.main }}><CheckCircleIcon sx={{ fontSize: 16, color: "#fff" }} /></Avatar>;
                      return (
                        <Avatar sx={{
                          width: 28, height: 28,
                          bgcolor: active ? palette.secondary.main : "#F1F5F9",
                          color: active ? "#fff" : "text.secondary",
                          fontSize: 12, fontWeight: 700
                        }}>
                          {index + 1}
                        </Avatar>
                      );
                    }}
                  >
                    <Typography fontSize={13} fontWeight={activeStep === index ? 700 : 500}
                      color={activeStep >= index ? palette.secondary.main : "text.secondary"}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ px: 3, py: 2.5 }}>
            {/* Step 1 */}
            {activeStep === 0 && (
              <Stack spacing={3}>
                <FormField label="Role Name" required error={errors.roleName}>
                  <TextField
                    value={roleName} onChange={e => setRoleName(e.target.value)}
                    placeholder="Enter role name (letters and spaces only)"
                    fullWidth size="small" />
                </FormField>

                <FormField label="Description (Optional)">
                  <TextField
                    value={roleDesc} onChange={e => setRoleDesc(e.target.value)}
                    placeholder="Enter role description" multiline rows={3} fullWidth size="small" />
                </FormField>

                <Box sx={{ border: "1px solid #E2E8F0", borderRadius: 3, p: 2, bgcolor: "#F8FAFC" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ bgcolor: "#FFFBEB", width: 40, height: 40, border: "1px solid #FEF3C7" }}>
                        <AdminIcon sx={{ color: "#D97706", fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight={700} fontSize={14} color="#1E293B">Administrator Role</Typography>
                        <Typography variant="caption" color="#64748B">
                          Grant full system access and administrative privileges
                        </Typography>
                      </Box>
                    </Stack>
                    <Switch checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                  </Stack>
                </Box>
                {/* ── Admin warning ── */}
                {isAdmin && (
                  <Box sx={{
                    bgcolor: "#FFFBEB", border: "1px solid #FEF3C7",
                    borderRadius: 3, p: 2.5,
                  }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start" mb={1.5}>
                      <Typography fontSize={14} lineHeight={1.6} color="#92400E">
                        <Box component="span" sx={{ fontSize: 18, mr: 1 }}>⚠️</Box>
                        <Box component="span" fontWeight={800}>Important:</Box>{" "}
                        Administrator roles have full system access including:
                      </Typography>
                    </Stack>
                    <Box component="ul" sx={{ m: 0, pl: 3.5 }}>
                      {[
                        "All permissions automatically granted",
                        "Cannot have permissions revoked",
                        "Bypasses all permission checks",
                        "Full access to all modules and data",
                      ].map(text => (
                        <Box key={text} component="li"
                          sx={{ fontSize: 13, color: "#92400E", mb: 0.75, fontWeight: 600 }}>
                          {text}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                <FormField label="Status">
                  <Select
                    fullWidth size="small"
                    value={roleStatus} onChange={e => setRoleStatus(e.target.value)}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormField>


              </Stack>
            )}

            {/* Step 2: Permissions Sidebar Layout */}
            {steps[activeStep] === "Manage Permissions" && (
              <Box sx={{ display: "flex", height: 440, mx: -3, mb: -2.5 }}>
                {/* Sidebar */}
                <Box sx={{ width: 240, borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
                  <Box sx={{ p: 2, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={12} fontWeight={700} color="#94A3B8" letterSpacing={0.5}>
                      AVAILABLE MODULES
                    </Typography>
                    <Button size="small" onClick={() => {
                      const mod = MODULES.find(m => m.id === selectedModuleId);
                      const allSelected = mod.actions.every(a => permissions[`${mod.id}_${a}`]);
                      mod.actions.forEach(a => handlePermToggle(`${mod.id}_${a}`, !allSelected));
                    }} sx={{ fontSize: 13, textTransform: "none", color: palette.primary.main, minWidth: "auto", px: 0 }}>
                      Select All
                    </Button>
                  </Box>
                  <Box sx={{ flexGrow: 1, overflowY: "auto", px: 1 }}>
                    {MODULES.map(m => (
                      <Box key={m.id} onClick={() => setSelectedModuleId(m.id)}
                        sx={{
                          display: "flex", alignItems: "center", gap: 1.5, p: 1.5, mb: 0.5,
                          borderRadius: 2.5, cursor: "pointer",
                          bgcolor: selectedModuleId === m.id ? alpha(palette.primary.main, 0.08) : "transparent",
                          color: selectedModuleId === m.id ? palette.primary.main : "#475569",
                          "&:hover": { bgcolor: alpha(palette.primary.main, 0.04) }
                        }}>
                        <FolderIcon sx={{ fontSize: 18, color: selectedModuleId === m.id ? palette.primary.main : "#94A3B8" }} />
                        <Typography fontSize={14} fontWeight={selectedModuleId === m.id ? 700 : 500}>
                          {m.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
                  <Box sx={{ p: 2 }}>
                    <TextField
                      fullWidth size="small" placeholder="Enter permission name to search..."
                      value={permSearch} onChange={e => setPermSearch(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" sx={{ color: "#94A3B8" }} />
                          </InputAdornment>
                        ),
                      }} />
                  </Box>
                  <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, pb: 2 }}>
                    {(() => {
                      const mod = MODULES.find(m => m.id === selectedModuleId);
                      const filteredActions = mod.actions.filter(a =>
                        a.toLowerCase().includes(permSearch.toLowerCase())
                      );

                      return filteredActions.map(action => {
                        const key = `${mod.id}_${action}`;
                        const checked = !!permissions[key];
                        const style = ACTION_STYLES[action] || ACTION_STYLES.view;

                        return (
                          <Box key={action} onClick={() => handlePermToggle(key, !checked)}
                            sx={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              p: 1.5, mb: 1, borderRadius: 20, bgcolor: "#fff", cursor: "pointer",
                              border: `1px solid ${checked ? palette.primary[200] : "#F1F5F9"}`,
                              transition: "all 0.2s",
                              "&:hover": { border: `1px solid ${palette.primary.main}`, bgcolor: alpha(palette.primary.main, 0.02) }
                            }}>
                            <Stack direction="row" alignItems="center" spacing={2.5}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 1 }}>
                                <Box sx={{
                                  fontSize: 18, p: 0.75, borderRadius: "50%",
                                  color: palette.primary.main,
                                  bgcolor: palette.primary[50],
                                  display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                  {style.icon}
                                </Box>
                                <Typography fontSize={14} fontWeight={600} color={palette.secondary.main}>
                                  {action.charAt(0).toUpperCase() + action.slice(1)}
                                </Typography>
                              </Box>
                            </Stack>
                            <Box sx={{
                              width: 22, height: 22, borderRadius: "50%",
                              border: `2px solid ${checked ? palette.primary.main : "#E2E8F0"}`,
                              bgcolor: checked ? palette.primary.main : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              mr: 1, transition: "all 0.2s"
                            }}>
                              {checked && <CheckCircleIcon sx={{ fontSize: 18, color: "#fff" }} />}
                            </Box>
                          </Box>
                        );
                      });
                    })()}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Step 3: Precise Review Layout */}
            {/* Step 3: Premium Review UI */}
            {steps[activeStep] === "Review & Done" && (
              <Stack spacing={3}>
                <Box sx={{
                  p: 3, borderRadius: 4,
                  bgcolor: alpha(palette.primary.main, 0.04),
                  border: `1px solid ${palette.primary[100]}`,
                  display: "flex", alignItems: "center", gap: 3
                }}>
                  <Avatar sx={{
                    width: 64, height: 64,
                    bgcolor: palette.primary.main,
                    boxShadow: `0 8px 16px ${alpha(palette.primary.main, 0.2)}`
                  }}>
                    <ShieldIcon sx={{ fontSize: 32, color: "#fff" }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color={palette.secondary.main} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                      {roleName}
                    </Typography>
                    <Typography variant="body2" color="#64748B" sx={{ maxWidth: 400 }}>
                      {roleDesc || "No description provided for this role."}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Chip
                      label={roleStatus}
                      sx={{
                        bgcolor: roleStatus === "Active" ? "#DCFCE7" : "#FEE2E2",
                        color: roleStatus === "Active" ? "#166534" : "#991B1B",
                        fontWeight: 700, px: 1
                      }}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2} wrap="nowrap">

                  <Grid item xs={6}>
                    <Box sx={{ p: 0, height: "100%" }}>
                      <Typography fontSize={12} fontWeight={700} color="#94A3B8" letterSpacing={1} mb={2}>
                        CONFIGURATION SUMMARY
                      </Typography>
                      <Stack spacing={2}>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#fff", border: "1px solid #F1F5F9" }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <AdminIcon sx={{ fontSize: 20, color: isAdmin ? palette.primary.main : "#94A3B8" }} />
                              <Typography fontSize={14} fontWeight={600} color="#475569">Access Level</Typography>
                            </Box>
                            <Typography fontSize={14} fontWeight={700} color={isAdmin ? palette.primary.main : "#64748B"}>
                              {isAdmin ? "Administrator" : "Standard User"}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#fff", border: "1px solid #F1F5F9" }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <GroupIcon sx={{ fontSize: 20, color: palette.primary.main }} />
                              <Typography fontSize={14} fontWeight={600} color="#475569">Status</Typography>
                            </Box>
                            <Typography fontSize={14} fontWeight={700} color={roleStatus === "Active" ? "#16A34A" : "#DC2626"}>
                              {roleStatus}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: alpha(palette.primary.main, 0.05), border: `1px dashed ${palette.primary[300]}` }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography fontSize={14} fontWeight={600} color={palette.primary.main}>Total Selected</Typography>
                            <Typography fontSize={18} fontWeight={800} color={palette.primary.main}>{isAdmin ? "All" : totalSelected}</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={7}>
                    <Box sx={{ p: 0, height: "100%" }}>
                      <Typography fontSize={12} fontWeight={700} color="#94A3B8" letterSpacing={1} mb={2}>
                        PERMISSIONS OVERVIEW
                      </Typography>
                      {isAdmin ? (
                        <Box sx={{
                          height: "10%", minHeight: 180, borderRadius: 4,
                          bgcolor: "#ffffffff", border: "1px solid #ffffffff",
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          p: 4, textAlign: "center"
                        }}>
                          <Avatar sx={{ width: 56, height: 56, bgcolor: "#FEF3C7", mb: 2 }}>
                            <AdminIcon sx={{ fontSize: 32, color: "#D97706" }} />
                          </Avatar>
                          <Typography variant="h6" color="#92400E" gutterBottom>
                            Full System Access
                          </Typography>
                          <Typography variant="body2" color="#B45309" sx={{ maxWidth: 280 }}>
                            As an Administrator, this role inherits all system permissions automatically. Individual module selection is not required.
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{
                          maxHeight: 250, overflowY: "auto", pr: 1,
                          "&::-webkit-scrollbar": { width: 6 },
                          "&::-webkit-scrollbar-thumb": { bgcolor: "#E2E8F0", borderRadius: 3 }
                        }}>
                          {(() => {
                            const selectedMods = MODULES.filter(m => m.actions.some(a => permissions[`${m.id}_${a}`]));
                            if (selectedMods.length === 0) return (
                              <Typography fontSize={14} color="#94A3B8" fontStyle="italic" sx={{ textAlign: "center", py: 4 }}>
                                No permissions have been selected yet.
                              </Typography>
                            );
                            return selectedMods.map(m => {
                              const activeActions = m.actions.filter(a => permissions[`${m.id}_${a}`]);
                              return (
                                <Box key={m.id} sx={{
                                  p: 2, mb: 1.5, borderRadius: 3, bgcolor: "#fff", border: "1px solid #F1F5F9",
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                                }}>
                                  <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
                                    <Box sx={{
                                      p: 1, borderRadius: 2, bgcolor: alpha(palette.primary.main, 0.08),
                                      color: palette.primary.main, display: "flex"
                                    }}>
                                      <FolderIcon sx={{ fontSize: 18 }} />
                                    </Box>
                                    <Typography fontSize={14} fontWeight={700} color="#334155">{m.label}</Typography>
                                    <Typography fontSize={12} fontWeight={600} color={palette.primary.main} sx={{ ml: "auto !important" }}>
                                      {activeActions.length} <Typography component="span" fontSize={11} color="#94A3B8" fontWeight={500}>actions</Typography>
                                    </Typography>
                                  </Stack>
                                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {activeActions.map(action => (
                                      <Chip
                                        key={action}
                                        label={action.charAt(0).toUpperCase() + action.slice(1)}
                                        size="small"
                                        sx={{
                                          bgcolor: palette.primary[50], color: palette.primary.main,
                                          fontWeight: 600, fontSize: 11, height: 22
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              );
                            });
                          })()}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </DialogContent>

          <Divider />

          <DialogActions sx={{ px: 3, py: 2.5, justifyContent: "space-between" }}>
            <Button onClick={activeStep === 0 ? closeDialog : handleBack} variant="outlined"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{
                color: "#64748B", borderColor: "#E2E8F0",
                borderRadius: 2.5, px: 3, textTransform: "none", fontWeight: 700,
                "&:hover": { borderColor: palette.primary.main, bgcolor: "rgba(0,0,0,0.02)" }
              }}>
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon fontSize="small" />}
                sx={{
                  bgcolor: palette.primary.main, borderRadius: 2.5, px: 4,
                  textTransform: "none", fontWeight: 700, color: "#fff",
                  "&:hover": { bgcolor: palette.primary[600] }
                }}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon fontSize="small" />}
                sx={{
                  bgcolor: palette.primary.main, borderRadius: 2.5, px: 4,
                  textTransform: "none", fontWeight: 700, color: "#fff",
                  "&:hover": { bgcolor: palette.primary[600] }
                }}>
                {editingRole ? "Update Role" : "Create Role"}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Details Dialog */}
        <RoleDetailsDialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          role={viewingRole}
          onEdit={() => openEdit(viewingRole)}
          onManagePerms={() => { openEdit(viewingRole); setActiveStep(1); }}
        />

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert severity={snackbar.severity} sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}