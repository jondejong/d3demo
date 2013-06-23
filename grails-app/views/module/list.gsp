<div>
    <h2>Modules</h2>
</div>
<div class="pull-left">
    <ul class="unstyled">
        <li data-ng-repeat="module in modules">{{module.name}}: <input data-ng-model="module.level" size="3 " />
        </li>
    </ul>
</div>
<div class="pull-left" id="container"></div>
