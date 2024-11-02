(function () {
    'use strict';

    const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'fly-prefer-region') {
            changeRegion(message.region);
            return true;
        }
    });

    function changeRegion(value) {

        const rules = [
            {
                id: 1,
                priority: 1,
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                    requestHeaders: [
                        {
                            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                            header: 'fly-prefer-region',
                            value: value,
                        },
                    ]
                },
                condition: {
                    //urlFilter: '/returnHeaders',
                    resourceTypes: allResourceTypes,
                }
            },
            // {
            //     id: 2,
            //     priority: 1,
            //     action: {
            //         type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            //         responseHeaders: [
            //             {
            //                 operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            //                 header: 'x-test-response-header',
            //                 value: 'test-value',
            //             },
            //         ]
            //     },
            //     condition: {
            //         urlFilter: 'https://testheaders.com/exampleAPI',
            //         resourceTypes: allResourceTypes,
            //     }
            // },
        ];

        if (value === 'disabled') {
            console.log('Disable fly-prefer-region');
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: rules.map((rule) => rule.id),
            });
            return;
        }

        console.log('Changing fly-prefer-region to:', value);
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map((rule) => rule.id),
            addRules: rules
        });
    }
})();
