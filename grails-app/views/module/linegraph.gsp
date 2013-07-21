<div class="pull-left">
    <ul class="unstyled">
        <li data-ng-repeat="module in modules"><input type="checkbox" ng-model="module.show"/>{{module.name}}</li>
    </ul>
</div>
<div class="pull-left padded-container" id="container"></div>

