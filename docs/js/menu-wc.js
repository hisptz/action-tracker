'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">action-tracker documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActionTrackerTableModule.html" data-type="entity-link">ActionTrackerTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' : 'data-target="#xs-components-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' :
                                            'id="xs-components-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' }>
                                            <li class="link">
                                                <a href="components/ActionTrackerWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionTrackerWidgetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AutoFilledInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutoFilledInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormInputItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormInputItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectBoxInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectBoxInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextAreaInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextAreaInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetContextMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetContextMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetItemLoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetItemLoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetNotificationBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WidgetNotificationBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' : 'data-target="#xs-directives-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' :
                                        'id="xs-directives-links-module-ActionTrackerTableModule-6275081ee555333a754a77d098960567"' }>
                                        <li class="link">
                                            <a href="directives/ClickOutsideDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClickOutsideDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-cdaa47b2bae26dece0c7595f608518e3"' : 'data-target="#xs-components-links-module-AppModule-cdaa47b2bae26dece0c7595f608518e3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cdaa47b2bae26dece0c7595f608518e3"' :
                                            'id="xs-components-links-module-AppModule-cdaa47b2bae26dece0c7595f608518e3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-bc9f0ceb044f2066a1e315123149b441"' : 'data-target="#xs-components-links-module-CoreModule-bc9f0ceb044f2066a1e315123149b441"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-bc9f0ceb044f2066a1e315123149b441"' :
                                            'id="xs-components-links-module-CoreModule-bc9f0ceb044f2066a1e315123149b441"' }>
                                            <li class="link">
                                                <a href="components/NavigationBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataEntryModule.html" data-type="entity-link">DataEntryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DataEntryModule-956645e64ff5067f12750b3c4f9ad6c7"' : 'data-target="#xs-components-links-module-DataEntryModule-956645e64ff5067f12750b3c4f9ad6c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataEntryModule-956645e64ff5067f12750b3c4f9ad6c7"' :
                                            'id="xs-components-links-module-DataEntryModule-956645e64ff5067f12750b3c4f9ad6c7"' }>
                                            <li class="link">
                                                <a href="components/DataEntryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataEntryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataEntryRoutingModule.html" data-type="entity-link">DataEntryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InterventionFilterModule.html" data-type="entity-link">InterventionFilterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' : 'data-target="#xs-components-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' :
                                            'id="xs-components-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' }>
                                            <li class="link">
                                                <a href="components/ActionTrackerWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionTrackerWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' : 'data-target="#xs-injectables-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' :
                                        'id="xs-injectables-links-module-InterventionFilterModule-89444dee2bec6fb092ba9be6be2e301e"' }>
                                        <li class="link">
                                            <a href="injectables/InterventionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InterventionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link">ReportModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReportRoutingModule.html" data-type="entity-link">ReportRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RoutingModule.html" data-type="entity-link">RoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SelectionFiltersModule.html" data-type="entity-link">SelectionFiltersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' : 'data-target="#xs-components-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' :
                                            'id="xs-components-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' }>
                                            <li class="link">
                                                <a href="components/NgxDhis2SelectionFiltersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgxDhis2SelectionFiltersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' : 'data-target="#xs-pipes-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' :
                                            'id="xs-pipes-links-module-SelectionFiltersModule-6f5356255d80fd5487d467a923956272"' }>
                                            <li class="link">
                                                <a href="pipes/SummarizeSelectionPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SummarizeSelectionPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DataEntryComponent-1.html" data-type="entity-link">DataEntryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InterventionFilterComponent.html" data-type="entity-link">InterventionFilterComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddActionTrackerConfigurationAction.html" data-type="entity-link">AddActionTrackerConfigurationAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddActionTrackerConfigurations.html" data-type="entity-link">AddActionTrackerConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddActionTrackerData.html" data-type="entity-link">AddActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddActionTrackerDataFail.html" data-type="entity-link">AddActionTrackerDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddActionTrackerDatas.html" data-type="entity-link">AddActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddActionTrackerDataSuccess.html" data-type="entity-link">AddActionTrackerDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddCurrentUser.html" data-type="entity-link">AddCurrentUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddIntervention.html" data-type="entity-link">AddIntervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddInterventions.html" data-type="entity-link">AddInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisConfiguration.html" data-type="entity-link">AddRootCauseAnalysisConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisConfigurationAction.html" data-type="entity-link">AddRootCauseAnalysisConfigurationAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisConfigurationsFail.html" data-type="entity-link">AddRootCauseAnalysisConfigurationsFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisConfigurationsSuccess.html" data-type="entity-link">AddRootCauseAnalysisConfigurationsSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisData.html" data-type="entity-link">AddRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRootCauseAnalysisDatas.html" data-type="entity-link">AddRootCauseAnalysisDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddSystemInfo.html" data-type="entity-link">AddSystemInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Back.html" data-type="entity-link">Back</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelActionTrackerData.html" data-type="entity-link">CancelActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelActionTrackerDataFail.html" data-type="entity-link">CancelActionTrackerDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelActionTrackerDataSuccess.html" data-type="entity-link">CancelActionTrackerDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearActionTrackerConfigurations.html" data-type="entity-link">ClearActionTrackerConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearActionTrackerDatas.html" data-type="entity-link">ClearActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearInterventions.html" data-type="entity-link">ClearInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearRootCauseAnalysisConfigurations.html" data-type="entity-link">ClearRootCauseAnalysisConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearRootCauseAnalysisDatas.html" data-type="entity-link">ClearRootCauseAnalysisDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRootCauseAnalysisData.html" data-type="entity-link">CreateRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRootCauseAnalysisDataFail.html" data-type="entity-link">CreateRootCauseAnalysisDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRootCauseAnalysisDataSuccess.html" data-type="entity-link">CreateRootCauseAnalysisDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerConfiguration.html" data-type="entity-link">DeleteActionTrackerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerConfigurations.html" data-type="entity-link">DeleteActionTrackerConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerData.html" data-type="entity-link">DeleteActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerDataFail.html" data-type="entity-link">DeleteActionTrackerDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerDatas.html" data-type="entity-link">DeleteActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteActionTrackerDataSuccess.html" data-type="entity-link">DeleteActionTrackerDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteIntervention.html" data-type="entity-link">DeleteIntervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteInterventions.html" data-type="entity-link">DeleteInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisConfiguration.html" data-type="entity-link">DeleteRootCauseAnalysisConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisConfigurations.html" data-type="entity-link">DeleteRootCauseAnalysisConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisData.html" data-type="entity-link">DeleteRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisDataFail.html" data-type="entity-link">DeleteRootCauseAnalysisDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisDatas.html" data-type="entity-link">DeleteRootCauseAnalysisDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteRootCauseAnalysisDataSuccess.html" data-type="entity-link">DeleteRootCauseAnalysisDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/Forward.html" data-type="entity-link">Forward</a>
                            </li>
                            <li class="link">
                                <a href="classes/Go.html" data-type="entity-link">Go</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndexDbServiceConfig.html" data-type="entity-link">IndexDbServiceConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadActionTrackerConfigurationAction.html" data-type="entity-link">LoadActionTrackerConfigurationAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadActionTrackerDatas.html" data-type="entity-link">LoadActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadActionTrackerDatasFail.html" data-type="entity-link">LoadActionTrackerDatasFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadCurrentUser.html" data-type="entity-link">LoadCurrentUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadCurrentUserFail.html" data-type="entity-link">LoadCurrentUserFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadInterventions.html" data-type="entity-link">LoadInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadInterventionsFail.html" data-type="entity-link">LoadInterventionsFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadInterventionsInitiated.html" data-type="entity-link">LoadInterventionsInitiated</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadRootCauseAnalysisConfigurationAction.html" data-type="entity-link">LoadRootCauseAnalysisConfigurationAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadRootCauseAnalysisConfigurationFail.html" data-type="entity-link">LoadRootCauseAnalysisConfigurationFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadRootCauseAnalysisDatas.html" data-type="entity-link">LoadRootCauseAnalysisDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadRootCauseAnalysisDatasFail.html" data-type="entity-link">LoadRootCauseAnalysisDatasFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadSystemInfo.html" data-type="entity-link">LoadSystemInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadSystemInfoFail.html" data-type="entity-link">LoadSystemInfoFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetRootCauseAnalysisData.html" data-type="entity-link">ResetRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteSerializer.html" data-type="entity-link">RouteSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveActionTrackerData.html" data-type="entity-link">SaveActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveActionTrackerDataFail.html" data-type="entity-link">SaveActionTrackerDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveActionTrackerDataSuccess.html" data-type="entity-link">SaveActionTrackerDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveRootCauseAnalysisData.html" data-type="entity-link">SaveRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveRootCauseAnalysisDataFail.html" data-type="entity-link">SaveRootCauseAnalysisDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveRootCauseAnalysisDataSuccess.html" data-type="entity-link">SaveRootCauseAnalysisDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateActionTrackerConfiguration.html" data-type="entity-link">UpdateActionTrackerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateActionTrackerConfigurations.html" data-type="entity-link">UpdateActionTrackerConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateActionTrackerData.html" data-type="entity-link">UpdateActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateActionTrackerDatas.html" data-type="entity-link">UpdateActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateIntervention.html" data-type="entity-link">UpdateIntervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInterventions.html" data-type="entity-link">UpdateInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisConfiguration.html" data-type="entity-link">UpdateRootCauseAnalysisConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisConfigurations.html" data-type="entity-link">UpdateRootCauseAnalysisConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisData.html" data-type="entity-link">UpdateRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisDataFail.html" data-type="entity-link">UpdateRootCauseAnalysisDataFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisDatas.html" data-type="entity-link">UpdateRootCauseAnalysisDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRootCauseAnalysisDataSuccess.html" data-type="entity-link">UpdateRootCauseAnalysisDataSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertActionTrackerConfiguration.html" data-type="entity-link">UpsertActionTrackerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertActionTrackerConfigurations.html" data-type="entity-link">UpsertActionTrackerConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertActionTrackerData.html" data-type="entity-link">UpsertActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertActionTrackerDatas.html" data-type="entity-link">UpsertActionTrackerDatas</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertDataSelectionsAction.html" data-type="entity-link">UpsertDataSelectionsAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertIntervention.html" data-type="entity-link">UpsertIntervention</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertInterventions.html" data-type="entity-link">UpsertInterventions</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertRootCauseAnalysisConfiguration.html" data-type="entity-link">UpsertRootCauseAnalysisConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertRootCauseAnalysisConfigurations.html" data-type="entity-link">UpsertRootCauseAnalysisConfigurations</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertRootCauseAnalysisData.html" data-type="entity-link">UpsertRootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpsertRootCauseAnalysisDatas.html" data-type="entity-link">UpsertRootCauseAnalysisDatas</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionTrackerConfigurationEffects.html" data-type="entity-link">ActionTrackerConfigurationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionTrackerConfigurationService.html" data-type="entity-link">ActionTrackerConfigurationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionTrackerDataEffects.html" data-type="entity-link">ActionTrackerDataEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionTrackerDataService.html" data-type="entity-link">ActionTrackerDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Dhis2ApiService.html" data-type="entity-link">Dhis2ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadWidgetService.html" data-type="entity-link">DownloadWidgetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalSelectionEffects.html" data-type="entity-link">GlobalSelectionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HandlerService.html" data-type="entity-link">HandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndexDbService.html" data-type="entity-link">IndexDbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterventionEffects.html" data-type="entity-link">InterventionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterventionService.html" data-type="entity-link">InterventionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RootCauseAnalysisConfigurationEffects.html" data-type="entity-link">RootCauseAnalysisConfigurationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RootCauseAnalysisConfigurationsService.html" data-type="entity-link">RootCauseAnalysisConfigurationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RootCauseAnalysisDataEffects.html" data-type="entity-link">RootCauseAnalysisDataEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RootCauseAnalysisDataService.html" data-type="entity-link">RootCauseAnalysisDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterEffects.html" data-type="entity-link">RouterEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SystemInfoEffects.html" data-type="entity-link">SystemInfoEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects.html" data-type="entity-link">UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService-1.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link">UtilService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionTrackerConfiguration.html" data-type="entity-link">ActionTrackerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionTrackerData.html" data-type="entity-link">ActionTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorMessage.html" data-type="entity-link">ErrorMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorMessage-1.html" data-type="entity-link">ErrorMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndexDbConfig.html" data-type="entity-link">IndexDbConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Intervention.html" data-type="entity-link">Intervention</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RootCauseAnalysisConfiguration.html" data-type="entity-link">RootCauseAnalysisConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RootCauseAnalysisData.html" data-type="entity-link">RootCauseAnalysisData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link">RouterStateUrl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionFilterConfig.html" data-type="entity-link">SelectionFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-2.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-3.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-4.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-5.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-6.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-7.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-8.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SystemInfo.html" data-type="entity-link">SystemInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SystemInfo-1.html" data-type="entity-link">SystemInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});