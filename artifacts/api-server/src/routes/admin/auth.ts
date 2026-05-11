import { Router, type IRouter } from "express";
import { AdminLoginBody, AdminLoginResponse } from "@workspace/api-zod";
import { getAdminCredentials } from "../../lib/auth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }
  const creds = getAdminCredentials();
  if (!creds) {
    req.log.error("Admin credentials not configured");
    res.status(500).json({ error: "Admin not configured" });
    return;
  }
  if (
    parsed.data.username !== creds.username ||
    parsed.data.password !== creds.password
  ) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  req.session.regenerate((regenErr) => {
    if (regenErr) {
      req.log.error({ err: regenErr }, "Session regenerate failed");
      res.status(500).json({ error: "Login failed" });
      return;
    }
    req.session.adminUser = { username: creds.username };
    req.session.save((saveErr) => {
      if (saveErr) {
        req.log.error({ err: saveErr }, "Session save failed");
        res.status(500).json({ error: "Login failed" });
        return;
      }
      res.json(AdminLoginResponse.parse({ username: creds.username }));
    });
  });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(204).end();
  });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  if (!req.session?.adminUser) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json(AdminLoginResponse.parse(req.session.adminUser));
});

export default router;
