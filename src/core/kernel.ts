import type { StrKitPlugin, StrKitKernel, StrKitConfig } from './types.js';
import { localeManager } from './locale.js';

/**
 * StrKit Kernel implementation
 * Central hub for plugin management and method resolution
 */
class StrKitKernelImpl implements StrKitKernel {
  private plugins: Map<string, StrKitPlugin> = new Map();
  private methods: Map<string, (...args: unknown[]) => unknown> = new Map();
  private config: StrKitConfig = { locale: 'en' };

  /**
   * Register a plugin with the kernel
   */
  register(plugin: StrKitPlugin): void {
    // Validate plugin
    this.validatePlugin(plugin);

    // Check dependencies
    this.checkDependencies(plugin);

    // Store plugin
    this.plugins.set(plugin.name, plugin);

    // Register all methods
    for (const [name, fn] of Object.entries(plugin.methods)) {
      const methodPath = `${plugin.name}.${name}`;
      this.methods.set(methodPath, fn as (...args: unknown[]) => unknown);
    }

    // Call init hook if exists
    if (plugin.init) {
      plugin.init(this);
    }
  }

  /**
   * Get a method by path (e.g., 'case.camel')
   */
  getMethod(path: string): ((...args: unknown[]) => unknown) | undefined {
    return this.methods.get(path);
  }

  /**
   * Get all methods for a plugin
   */
  getPluginMethods(pluginName: string): Record<string, (...args: unknown[]) => unknown> {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) return {};
    return plugin.methods as Record<string, (...args: unknown[]) => unknown>;
  }

  /**
   * Check if a plugin is registered
   */
  hasPlugin(name: string): boolean {
    return this.plugins.has(name);
  }

  /**
   * Get all registered plugins
   */
  getPlugins(): StrKitPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get current locale
   */
  getLocale(): string {
    return this.config.locale;
  }

  /**
   * Set current locale
   */
  setLocale(locale: string): void {
    this.config.locale = locale;
    localeManager.setLocale(locale);
  }

  /**
   * Validate plugin structure
   */
  private validatePlugin(plugin: StrKitPlugin): void {
    if (!plugin.name) {
      throw new Error('Plugin must have a name');
    }
    if (!plugin.version) {
      throw new Error(`Plugin '${plugin.name}' must have a version`);
    }
    if (!plugin.methods || typeof plugin.methods !== 'object') {
      throw new Error(`Plugin '${plugin.name}' must have a methods object`);
    }
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' is already registered`);
    }
  }

  /**
   * Check plugin dependencies
   */
  private checkDependencies(plugin: StrKitPlugin): void {
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(
            `Plugin '${plugin.name}' depends on '${dep}' which is not registered`
          );
        }
      }
    }
  }
}

/**
 * Singleton kernel instance
 */
export const kernel = new StrKitKernelImpl();

/**
 * Register a plugin with StrKit
 */
export function registerPlugin(plugin: StrKitPlugin): void {
  kernel.register(plugin);
}

/**
 * Get all registered plugins
 */
export function getPlugins(): StrKitPlugin[] {
  return kernel.getPlugins();
}

/**
 * Check if a plugin is registered
 */
export function hasPlugin(name: string): boolean {
  return kernel.hasPlugin(name);
}
