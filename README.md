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

A very simple bar chart using SVG Rects.

#### Transitional Bar Chart

This takes our simple example and adds transitions. There are varying transitions in the code documented and commented out. You can change which is applied to see the effects.

#### Dynamic Bar Chart

This adds to our bar chart by making it dynamic. You can add an remove data dynamically using the enter and exit selections.

#### Line Graph

The Line Graph is a simple line graph allowing the user to dynamically add/remove data sets. This models our data changing over time (see [Data Model] (#the-data-model)).

#### Line Graph 2

#### Pie Chart

#### Dynamic Pie Chart

#### Force Chart

## The Data Model

## Architectural Overview




