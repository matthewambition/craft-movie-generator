<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'cpTrigger' => 'binge',
        'securityKey' => getenv('SECURITY_KEY'),
        'useProjectConfigFile' => false,
        'doAnalytics' => false,
        'gaCode' => 'GTM-XXXXXXX',
    ],

    // Dev environment settings
    'dev' => [
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        'allowAdminChanges' => true,
        'devMode' => true,
    ],

    // Production environment settings
    'production' => [
        'allowAdminChanges' => false,
        'doAnalytics' => true,
    ],
];
