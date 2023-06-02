import {
  CardGroup,
  Info,
  Warning,
  Note,
  Tip,
  Check,
  Tabs,
  Tab,
  Tooltip,
  Frame,
} from '@mintlify/components';
import { MDXComponents } from 'mdx/types';
import Link from 'next/link';

import { Accordion, AccordionGroup } from '@/components/Accordion';
import { Card } from '@/components/Card';
import { CodeBlock } from '@/components/CodeBlock';
import { CodeGroup, SnippetGroup } from '@/components/CodeGroup';
import { Expandable } from '@/components/Expandable';
import { Heading } from '@/components/Heading';
import { Latex } from '@/components/Latex';
import { Param, ParamField } from '@/components/Param';
import { ResponseField } from '@/components/ResponseField';
import { staticComponents } from '@/components/Static';
import { RequestExample, ResponseExample } from '@/components/StickyCodeBlocks';
import { MDXContentController } from '@/ui/MDXContentController/MDXContentController';

const components: MDXComponents = {
  Accordion,
  AccordionGroup,
  Heading,
  Card,
  CardGroup,
  Check,
  CodeGroup,
  CodeBlock,
  Expandable,
  Frame,
  Info,
  Link,
  MDXContentController,
  Note,
  Param,
  ParamField,
  RequestExample,
  ResponseExample,
  ResponseField,
  Tab,
  Tabs,
  Tip,
  Tooltip,
  SnippetGroup,
  Warning,
  Latex,
  ...staticComponents,
};

export const allowedComponents = [
  'ApiPlayground',
  'Accordion',
  'AccordionGroup',
  'CodeGroup',
  'CodeBlock',
  'SnippetGroup',
  'RequestExample',
  'ResponseExample',
  'Param',
  'ParamField',
  'Card',
  'CardGroup',
  'Expandable',
  'Frame',
  'Heading',
  'Info',
  'Link',
  'MDXContentController',
  'ResponseField',
  'Warning',
  'Note',
  'Tip',
  'Check',
  'Tabs',
  'Tab',
  'Tooltip',
  'Latex',
  'a',
  'b',
  'br',
  'button',
  'div',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'head',
  'iframe',
  'img',
  'input',
  'label',
  'li',
  'link',
  'ol',
  'p',
  'path',
  'picture',
  'script',
  'section',
  'source',
  'span',
  'sub',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul',
  'video',
  'code',
  'pre',
  // Custom tags
  'zapier-zap-templates',
];

export default components;
