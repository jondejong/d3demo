# d3demo

Demoing D3 with Angular and Grails

## Overview

This is a demo of various graph types in D3, originally written fro G8Conf US 2013.

The app is a Grails 2.2 Application. If you have Grails 2.2 running, you can clone or fork this repo, call "grails run-app", and see get it running.

## The Simple Example

There is a very simple single page example in /Example/example.html. This is a standalone page designed to demo very basic selections, joins, and DOM manipulations.

## The Charts

There are 8 different charts modelling the same data set in HTML SVG tags. Each chart has a corresponding JS file in web-app/js/d3modules the relevant D3 code that renders the chart. This leads to way more code than is needed for this application --there's lots of duplicate code that could be refactored into a shared location -- but it makes it easier to read as almost entirely self contained modules.

#### Bar Chart

Bar Chart very simple bar chart using SVG Rects.

#### Transitional Bar Chart

Transitional Bar Chart takes our simple example and adds transitions. There are varying transitions in the code documented and commented out. You can change which is applied to see the effects.

#### Dynamic Bar Chart

The Dynamic Bar Chart adds to the Bar Chart by making it dynamic. The user can add an remove data dynamically using the enter and exit selections.

#### Line Graph

The Line Graph is a simple line graph allowing the user to dynamically add/remove data sets. This models our data changing over time (see [Data Model] (#the-data-model)). This line graph is built by manually calculating points and adding SVG Line elements.

#### Line Graph 2

To the user, Line Graph 2 appears the same as Line Graph. Under the hood, however, it uses the D3 Line generator as outputs SVG Path elements instead of Lines.

#### Pie Chart

Pie Chart is a basic Pie Chart using the D3 Arch Generator and Pie Layout.

#### Dynamic Pie Chart

Dynamic Pie Chart adds to Pie Chart by adding click events and transitions.

#### Force Chart

Force Chart is a very simple bubble chart utilizing the the D3 Force Layout.

## The Data Model

## Architectural Overview




