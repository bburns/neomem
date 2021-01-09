# Neomem

An open-source information manager - with plugins for different views and datasources


[![Github Issues](https://img.shields.io/github/issues/bburns/Neomem.svg)](https://github.com/bburns/Neomem/issues)
[![License](https://img.shields.io/github/license/bburns/Neomem.svg)]()
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Github code size in bytes](https://img.shields.io/github/languages/code-size/bburns/Neomem.svg)]()
[![Follow me on Twitter](https://img.shields.io/twitter/follow/bburnskm.svg?label=Twitter&style=flat&color=blue)](https://twitter.com/bburnskm)
[![Formatted with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- <a href="https://codecov.io/gh/bburns/neomem"><img alt="Codecov Coverage Status" src="https://img.shields.io/Neomem/c/github/bburns/Neomem.svg?style=flat"></a> -->
<!-- <a href="https://www.npmjs.com/package/neomem"><img alt="npm version" src="https://img.shields.io/npm/v/Neomem.svg?style=flat-square"></a> -->
<!-- <a href="https://www.npmjs.com/package/neomem"><img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/Neomem.svg?style=flat-square"></a> -->


- [Neomem](#neomem)
  - [About](#about)
  - [Goals](#goals)
  - [Use Cases](#use-cases)
  - [Inspiration](#inspiration)
  - [Implementation](#implementation)
  - [Architecture](#architecture)
  - [Features](#features)
  - [Packages](#packages)
  - [Installation](#installation)
  - [Running](#running)
  - [Development](#development)


## About

Spreadsheets are good for tabular information, while documents are good for free-form notes and outlines. Neomem makes it easy to switch between the two, allowing different views of the same information. 

For example, tasks can have short properties like name, timeframe, order, estimate, which fit well in a table - while also having longer properties like notes. Switching between table and document views allows you to focus on one or the other as needed.

Data can be filtered, grouped, and sorted as required. 

Other views are possible for the same underlying information - chart, map, calendar, kanban, graph. Multiple views could be visible at the same time. A console view could allow exploration and manipulation of items in a text console. 

All views will be developed as plugins. The backend can connect to multiple data sources, which will also be supported with plugins. Different overlapping domains can be modelled. A plugin ecosystem will allow sharing and development of them all as npm packages. 


## Goals

- clutter-free ui that gets out of the way, leaves room for editing
- different views of same information - document, table, outline, map, calendar, kanban, chart, graph, timeline, console
- handle different data sources - neo4j graph database, xml, filesystem, email, github, calendar
- handle different overlapping domains with simple and extensible datamodels - task management, collection management
- all views, sources, and domains are npm packages
- different ui's could be implemented - a pure console ui, a web ui, an electron (desktop) ui, etc
- open source with paid hosting plans
- online plugin ecosystem/marketplace for views, sources, domains, and ui's - free/paid


## Use Cases

Some use cases to test the app and database structure -

- task manager - projects, tasks, goals, timeframe, estimate, actual, recurring tasks - switch between table, document, kanban, calendar, timeline views
- comparison shopping - make quick tables for comparison between items, with free-form notes
- art travel planner - location (continent/country/state/city/museum), artist, date, name, rating, source, size, images - switch between table, map views
- screenplay/outline editor - acts, scenes, characters, locations
- biographical timelines - subject, event, date, age, location - switch between table, document, map views
- genealogy - add properties to relationships, e.g. marriage date and location


## Inspiration

- Lotus Symphony (1990) - spreadsheet, chart, and document views of same information
- Apple II, Zork, Linux cli, IPython - for console interface
- Airtable - advanced table editor


## Implementation

- react frontend ui with view plugins
- native data stored to neo4j in google cloud - access data anywhere
- graphql api with plugins for different data sources


## Architecture

![arch](https://raw.githubusercontent.com/bburns/Neomem/main/docs/architecture2020-12.dot.svg)


## Features

- select text in notes, promote to item(s) with alt-m command
- move text and items easily to other items with alt-m command
- create new items quickly with alt-n command, put in an inbox
- go to item quickly with alt-g command, start typing to filter list
- clipboard monitor - paste contents when it changes


## Packages

- neomem-data - datasource manager
- neomem-data-neo4j - plugin for neo4j graph databases
- neomem-data-filesys - plugin for file system access
- neomem-console - console interface
- neomem-web - web interface


## Installation

Clone this repo

    git clone https://github.com/bburns/neomem

Install dependencies

    yarn


## Running

    yarn start
    
## Development

