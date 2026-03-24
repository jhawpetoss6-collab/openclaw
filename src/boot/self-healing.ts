import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Self-healing check for missing plugin modules.
 * Addresses #53818.
 */
export async function healPluginRuntime(pluginName: string, pluginDir: string) {
    const requiredFiles = ["dist", "package.json"]; // Placeholder for manifest check
    const missing = requiredFiles.filter(f => !fs.existsSync(path.join(pluginDir, f)));

    if (missing.length > 0) {
        console.warn(`[self-healing] Missing runtime files for ${pluginName}. Attempting repair...`);
        try {
            execSync("npm install --prefer-offline", { cwd: pluginDir, stdio: "inherit" });
            console.info(`[self-healing] ${pluginName} repaired successfully.`);
        } catch (e) {
            console.error(`[self-healing] Failed to repair ${pluginName}: ${e}`);
        }
    }
}
