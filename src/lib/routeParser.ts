// src/utils/routeParser.ts
import type { RouteLocationNormalized } from 'vue-router';

export interface RouteModules {
  module?: string;
  [key: `module${number}`]: string;
}

/**
 * Capitalizes the first letter of a string
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Extracts and formats modules from Vue Router path
 * @param route - The route object from Vue Router
 * @returns Object containing capitalized modules (Module, Module1, Module2, etc.)
 */
export function getModulesFromRoute(route: RouteLocationNormalized): RouteModules {
  const pathToParse = route.fullPath;
  
  const cleanPath = pathToParse
    .replace(/\?.*$/, '')
    .replace(/#.*$/, '');
    
  const parts = cleanPath.split('/').filter(Boolean);
  
  const result: RouteModules = {};
  
  if (parts.length > 0) {
    result.module = capitalizeFirstLetter(parts[0]);
    
    parts.slice(1).forEach((part, index) => {
      result[`module${index + 1}` as keyof RouteModules] = capitalizeFirstLetter(part);
    });
  }
  
  return result;
}