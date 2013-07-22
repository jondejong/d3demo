# d3demo

Demoing D3 with Angular and Grails

## Overview

This is a demo of various graph types in D3, originally written fro G8Conf US 2013.

The app is a Grails 2.2 Application. If you have Grails 2.2 running, you can clone or fork this repo, call "grails run-app", and see get it running.

## The Simple Example

There is a very simple single page example in /Example/example.html. This is a standalone page designed to demo very basic selections, joins, and DOM manipulations.

## The Charts

There are 8 different charts modelling the same data set. Each chart has a corresponding JS file in web-app/js/d3modules the relevant D3 code that renders the chart. This leads to way more code than is needed for this application --there's lots of duplicate code that could be refactored into a shared location -- but it makes it easier to read as almost entirely self contained modules.

#### Bar Chart

#### Transitional Bar Chart

#### Dynamic Bar Chart

#### Line Graph

#### Line Graph 2

#### Pie Chart

#### Dynamic Pie Chart

#### Force Chart

## The Data Model

## Architectural Overview




