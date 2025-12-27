/// <reference types="vitest/globals" />
import { kernel, registerPlugin, getPlugins, hasPlugin } from '../../../src/core/kernel.js';
import type { StrKitPlugin } from '../../../src/core/types.js';
// Import locales to register them
import '../../../src/locales/index.js';

describe('StrKitKernel', () => {
  // Note: kernel is a singleton, tests may affect each other

  describe('kernel instance', () => {
    it('should have kernel methods', () => {
      expect(kernel.register).toBeDefined();
      expect(kernel.hasPlugin).toBeDefined();
      expect(kernel.getPlugins).toBeDefined();
      expect(kernel.getMethod).toBeDefined();
      expect(kernel.getPluginMethods).toBeDefined();
      expect(kernel.getLocale).toBeDefined();
      expect(kernel.setLocale).toBeDefined();
    });
  });

  describe('plugin functions', () => {
    it('should register plugin via registerPlugin', () => {
      const plugin: StrKitPlugin = {
        name: 'test-plugin-1',
        version: '1.0.0',
        methods: {
          testMethod: (input: string) => input.toUpperCase(),
        },
      };

      registerPlugin(plugin);
      expect(hasPlugin('test-plugin-1')).toBe(true);
    });

    it('should get all plugins via getPlugins', () => {
      const plugins = getPlugins();
      expect(Array.isArray(plugins)).toBe(true);
    });

    it('should check plugin existence via hasPlugin', () => {
      expect(hasPlugin('nonexistent-plugin')).toBe(false);
    });
  });

  describe('getMethod', () => {
    it('should get a registered method', () => {
      const plugin: StrKitPlugin = {
        name: 'method-test-1',
        version: '1.0.0',
        methods: {
          upper: (s: string) => s.toUpperCase(),
        },
      };

      registerPlugin(plugin);
      const method = kernel.getMethod('method-test-1.upper');
      expect(method).toBeDefined();
      expect(method!('hello')).toBe('HELLO');
    });

    it('should return undefined for non-existent method', () => {
      expect(kernel.getMethod('nonexistent.method')).toBeUndefined();
    });
  });

  describe('getPluginMethods', () => {
    it('should get all methods for a plugin', () => {
      const plugin: StrKitPlugin = {
        name: 'multi-method-1',
        version: '1.0.0',
        methods: {
          upper: (s: string) => s.toUpperCase(),
          lower: (s: string) => s.toLowerCase(),
        },
      };

      registerPlugin(plugin);
      const methods = kernel.getPluginMethods('multi-method-1');
      expect(methods.upper).toBeDefined();
      expect(methods.lower).toBeDefined();
    });

    it('should return empty object for non-existent plugin', () => {
      const methods = kernel.getPluginMethods('nonexistent');
      expect(methods).toEqual({});
    });
  });

  describe('locale management', () => {
    it('should get and set locale', () => {
      const originalLocale = kernel.getLocale();
      kernel.setLocale('tr');
      expect(kernel.getLocale()).toBe('tr');
      // Reset
      kernel.setLocale(originalLocale);
    });
  });

  describe('plugin validation', () => {
    it('should throw for plugin without name', () => {
      expect(() => {
        registerPlugin({ name: '', version: '1.0.0', methods: {} } as StrKitPlugin);
      }).toThrow();
    });

    it('should throw for plugin without version', () => {
      expect(() => {
        registerPlugin({ name: 'no-version-1', version: '', methods: {} } as StrKitPlugin);
      }).toThrow();
    });

    it('should throw for duplicate plugin', () => {
      const plugin: StrKitPlugin = {
        name: 'duplicate-test-1',
        version: '1.0.0',
        methods: {},
      };
      registerPlugin(plugin);
      expect(() => registerPlugin(plugin)).toThrow();
    });
  });

  describe('plugin dependencies', () => {
    it('should throw for missing dependency', () => {
      const plugin: StrKitPlugin = {
        name: 'depends-on-missing-1',
        version: '1.0.0',
        methods: {},
        dependencies: ['nonexistent-dependency'],
      };
      expect(() => registerPlugin(plugin)).toThrow();
    });
  });

  describe('plugin init hook', () => {
    it('should call init hook', () => {
      const initFn = vi.fn();
      const plugin: StrKitPlugin = {
        name: 'init-test-1',
        version: '1.0.0',
        methods: {},
        init: initFn,
      };
      registerPlugin(plugin);
      expect(initFn).toHaveBeenCalled();
    });
  });
});
