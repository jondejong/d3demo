<div>
    <h2>Modules</h2>
</div>

<ul class="navbar-inner">
    <li><a href="#/barchart">Bar Chart</a></li>
    <li><a href="#/tbarchart">Transitional Bar Chart</a></li>
    <li><a href="#/dbarchart">Dynamic Bar Chart</a></li>
    <li><a href="#/linegraph">Line Graph</a></li>
    <li><a href="#/linegraph2">Line Graph 2</a></li>
    <li><a href="#/piechart">Pie Chart</a></li>
    <li><a href="#/dpiechart">Dynamic Pie Chart</a></li>
    <li><a href="#/forcechart">Force Chart</a></li>
</ul>

<div ng-view class="navbar-inner"></div>


<div ng-controller="navigationCtrl">
    <input type="button" class="btn-primary" data-ng-click="randomize()" value="Randomize Data"/>
</div>