# Neomem

An open-source information manager - with plugins for different views and datasources

[![Github Issues](https://img.shields.io/github/issues/bburns/Neomem.svg)](https://github.com/bburns/Neomem/issues)
[![License](https://img.shields.io/github/license/bburns/Neomem.svg)]()
[![Github code size in bytes](https://img.shields.io/github/languages/code-size/bburns/Neomem.svg)]()
[![Follow me on Twitter](https://img.shields.io/twitter/follow/bburnskm.svg?label=Twitter&style=flat&color=blue)](https://twitter.com/bburnskm)
[![Formatted with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) -->
<!-- <a href="https://codecov.io/gh/bburns/neomem"><img alt="Codecov Coverage Status" src="https://img.shields.io/Neomem/c/github/bburns/Neomem.svg?style=flat"></a> -->
<!-- <a href="https://www.npmjs.com/package/neomem"><img alt="npm version" src="https://img.shields.io/npm/v/Neomem.svg?style=flat-square"></a> -->
<!-- <a href="https://www.npmjs.com/package/neomem"><img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/Neomem.svg?style=flat-square"></a> -->

- [Neomem](#neomem)
  - [About](#about)
  - [Current Status](#current-status)
  - [Goals](#goals)
  - [Use Cases](#use-cases)
  - [Inspiration](#inspiration)
  - [Implementation](#implementation)
  - [Architecture](#architecture)
  - [Features](#features)
  - [Installation](#installation)
  - [Running](#running)
  - [Links](#links)
  - [License](#license)

## About

Spreadsheets are good for tabular information, while documents are good for free-form notes and outlines. Neomem makes it easy to switch between the two, allowing different views of the same information.

For example, tasks can have short properties like name, timeframe, order, estimate, which fit well in a table - while also having longer properties like notes. Switching between table and document views allows you to focus on one or the other as needed.

Data can be filtered, grouped, and sorted as required.

Other views are possible for the same underlying information - chart, map, calendar, kanban, graph. Multiple views could be visible at the same time. A console view could allow exploration and manipulation of items in a text console.

All views will be developed as plugins. The backend can connect to multiple data sources, which will also be supported with plugins. Different overlapping domains can be modelled. A plugin ecosystem will allow sharing and development of them all as npm packages.

## Current Status

See the list of issues in the current milestone [here](https://github.com/bburns/Neomem/milestone/1).

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
- [The Inform Designer's Manual](https://www.amazon.com/Inform-Designers-Manual-Graham-Nelson/dp/0971311900) by Graham Nelson - the language and parser of Zork

## Implementation

- react frontend ui with view plugins
- native data stored to arangodb in google cloud - access data anywhere
- rest api with plugins for different data sources

## Architecture

![arch](design/architecture.dot.svg)

## Features

- select text in notes, promote to item(s) with alt-m command
- move text and items easily to other items with alt-m command
- create new items quickly with alt-n command, put in an inbox
- go to item quickly with alt-g command, start typing to filter list
- clipboard monitor - paste contents when it changes

<!-- ## Packages

- neomem-console - console interface
- neomem-web - web interface
- neomem-gateway - datasource manager
- neomem-driver-pg - plugin for postgres databases
- neomem-driver-neo4j - plugin for neo4j graph databases
- neomem-driver-filesys - plugin for file system access
- neomem-driver-bookmarks - plugin for chrome bookmark access -->

## Installation

Note: Neomem is under heavy development.

Install nodejs, then clone this repo and install the dependencies

    git clone https://github.com/bburns/Neomem
    cd Neomem
    npm install

Install [micro](https://github.com/zyedidia/micro), a text editor - see https://github.com/zyedidia/micro#installation, or on Mac,

    brew install micro

## Running

    npm start

## Links

Blog at https://neomem.io.

Follow along on Twitter - https://twitter.com/bburnskm and https://twitter.com/neomem_io.

<!-- ## Support

You can support Neomem development through ko-fi here - https://ko-fi.com/bburns. Thank you! -->

## License

MIT
