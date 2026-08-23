<?php
declare(strict_types=1);

// CatchdomsSecurity SDK configuration

class CatchdomsSecurityConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CatchdomsSecurity",
                "slug" => "catchdoms-security",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://catchdoms.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "domain" => [],
                    "mcp" => [],
                    "pending_delete" => [],
                ],
            ],
            "entity" => [
        'domain' => [
          'fields' => [
            [
              'name' => 'age',
              'short' => 'Years since first Wayback snapshot',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'auction_end_date',
              'short' => 'Auction end date and time (ISO 8601)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'backlinks_count',
              'short' => 'Total number of backlinks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'bids_count',
              'short' => 'Number of bids',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'citation_flow',
              'short' => 'Majestic Citation Flow score (0-100)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'domain_authority',
              'short' => 'Moz Domain Authority score (0-100)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'edu_gov_backlinks',
              'short' => 'Number of EDU/GOV backlinks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'effective_price',
              'short' => 'Effective price (max_bid or price) in EUR',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'has_gmb',
              'short' => 'Has active Google Business Profile',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique domain identifier',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'language',
              'short' => 'Detected content language (e.g., EN, FR, DE)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'max_bid',
              'short' => 'Current highest bid in EUR',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Domain name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pagerank',
              'short' => 'Historical PageRank value',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'price',
              'short' => 'Starting price or buy-now price in EUR',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'purchase_url',
              'short' => 'Direct URL to purchase or bid on the domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'referring_domains',
              'short' => 'Number of unique referring domains',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'score',
              'req' => true,
              'short' => 'CatchDoms quality score (0-100)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'source',
              'req' => true,
              'short' => 'Platform source (e.g., godaddy, dropcatch, regfree)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tld',
              'req' => true,
              'short' => 'Top-level domain extension',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'topical_trust_flow',
              'short' => 'Majestic Topical Trust Flow category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'trust_flow',
              'short' => 'Majestic Trust Flow score (0-100)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'short' => 'Domain listing type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'wayback_first_date',
              'short' => 'Date of first Wayback snapshot',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'wayback_snapshots',
              'short' => 'Number of Wayback Machine snapshots',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'domain',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'age_min',
                        'orig' => 'age_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'Business,Health',
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'cf_min',
                        'orig' => 'cf_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'contain',
                        'orig' => 'contain',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'da_min',
                        'orig' => 'da_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'has_backlink',
                        'orig' => 'has_backlink',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'has_bid',
                        'orig' => 'has_bid',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'has_edu_gov',
                        'orig' => 'has_edu_gov',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'has_gmb',
                        'orig' => 'has_gmb',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'EN',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'price_max',
                        'orig' => 'price_max',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'price_min',
                        'orig' => 'price_min',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'rd_min',
                        'orig' => 'rd_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'score_min',
                        'orig' => 'score_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'snapshots_min',
                        'orig' => 'snapshots_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'source',
                        'orig' => 'source',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tf_min',
                        'orig' => 'tf_min',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => '.com',
                        'kind' => 'query',
                        'name' => 'tld',
                        'orig' => 'tld',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/domains',
                  'parts' => [
                    'api',
                    'domains',
                  ],
                  'select' => [
                    'exist' => [
                      'age_min',
                      'category',
                      'cf_min',
                      'contain',
                      'da_min',
                      'has_backlink',
                      'has_bid',
                      'has_edu_gov',
                      'has_gmb',
                      'language',
                      'page',
                      'per_page',
                      'price_max',
                      'price_min',
                      'rd_min',
                      'score_min',
                      'snapshots_min',
                      'source',
                      'tf_min',
                      'tld',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'mcp' => [
          'fields' => [
            [
              'name' => 'capabilities',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'server',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'version',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'mcp',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mcp/catchdoms',
                  'parts' => [
                    'mcp',
                    'catchdoms',
                  ],
                  'select' => [
                    '$action' => 'catchdom',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.capabilities`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'pending_delete' => [
          'fields' => [
            [
              'name' => 'age',
              'short' => 'Years since first Wayback snapshot',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'backlinks_count',
              'short' => 'Total number of backlinks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'days_until_drop',
              'short' => 'Days until predicted drop date',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique domain identifier',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Domain name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'predicted_drop_date',
              'req' => true,
              'short' => 'Predicted drop date (YYYY-MM-DD)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'referring_domains',
              'short' => 'Number of unique referring domains',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'score',
              'short' => 'CatchDoms quality score (0-100)',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'req' => true,
              'short' => 'Current domain status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tld',
              'req' => true,
              'short' => 'Top-level domain extension',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'pending_delete',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'drop_date_max',
                        'orig' => 'drop_date_max',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'drop_date_min',
                        'orig' => 'drop_date_min',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tld',
                        'orig' => 'tld',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/pending-delete',
                  'parts' => [
                    'api',
                    'pending-delete',
                  ],
                  'select' => [
                    'exist' => [
                      'drop_date_max',
                      'drop_date_min',
                      'page',
                      'per_page',
                      'status',
                      'tld',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CatchdomsSecurityFeatures::make_feature($name);
    }
}
