---
title: 'Types'
date: 2021-02-08T00:38:42-06:00
featured_image: images/landscape.jpg
---

I'm trying to figure out how to handle types - Neomem needs to understand a set of basic types, and to translate between those and each datasource's types.

e.g. Chrome Bookmarks have a `date_added` field, which is based on the year 1601. We'll need to translate that to the `created` field, which is an ISO datestring like '2021-02-08', and vice-versa.

We could store a library of these datatypes, usable by different datasources. e.g. `date1601`, in case some other datasource needed it also.

Put this in neomem-util? neomem-types? neomem-data?

Types need to be dynamic, as with neo4j - user will be able to define new types/labels as needed, and they can contain fields, or relations with other nodes.

Should we start developing the neo4j datasource to exercise all this stuff? Should at least sketch out what it needs.
