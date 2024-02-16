import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';

export const setupGlobalRules = () => {
  Object.keys(rules).forEach(rule => {
    defineRule(rule, rules[rule]);
  });
};

