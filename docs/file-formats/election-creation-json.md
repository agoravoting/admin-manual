---
id: election-creation-json
title: Election Creation JSON
sidebar_label: Election Creation JSON
slug: /file-formats/election-creation-json
---

## Election JSON settings

<!-- 
Note that we name thee file ./assets/sample_config.yml even if it is a JSON file
because otherwise it would fail to compile and it would force us to put assets 
in /static/ directory, which results in a much a less self-contained file tree.
-->

In this section we will describe the different options that can be configured 
in the Edit JSON Dialog for Election Creation.  You review an example of a 
[sample election JSON configuration here](./assets/sample_config.yml).

As can be seen in the last screenshot, the JSON Format starts with a list. This
is a list of [Elections](#election-object). This means you can directly create 
multiple elections at once like this:

```json title="multiple_elections.json"
[
  {
    ...Election 1 configuration..
  },
  {
    ...Election 2 configuration..
  },
  {
    ...Election 3 configuration..
  },
]
```

Once you click on the `Finish edit` in the `Edit Election Json` dialog, if you
have added multiple elections this will be reflected in the interface.

## Election object

Within the Election JSON settings that can be set using the `Edit Election JSON` 
dialog, each election can have the following settings:

### Election: `id`

- **Property name**: `id`
- **Type:** `Positive Integer`
- **Required:** No
- **Default:** -
- **Example:** `345`

Election's unique id. It will automatically be assigned one if none is set. If 
the election already exists and the user has permissions to edit it, the
election configuration will be updated if the election is registered but
not yet created ([details here](#modifying-elections)).

### Election: `title`

- **Property name**: `title`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `"New election"`

Election's title. It will appear in the admin election list, and as the
election title in the public election site and in the voting booth start screen.

### Election: `description`

- **Property name**: `description`
- **Type:** `Long String`
- **Required:** Yes
- **Default:** -
- **Example:** `"This is the description of the election. You can add simple html like <strong>bold</strong> or <a href=\"https://nvotes.com\">links to websites</a>.\n\n<br><br>You need to use two br element for new paragraphs."`

Election's description. It will appear below the title in the public election 
site and in the voting booth start screen. As shown in the example it allows 
for some basic HTML.

### Election: `virtual`

- **Property name**: `virtual`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

:::info Enabling Virtual Elections
Virtual elections are not enabled by default because for security reasons 
virtual elections should not be enabled in multi-tenant deployments, as 
`agora-elections` do not verify that the election creator has permissions for
accessing the sub-elections.

To allow virtual election you have to enable it in the 
[deployment configuration](../deployment/guide), which can be done by setting
the `config.agora_elections.virtualElectionsAllowed` setting in the `config.yml` 
deployment configuration file to `true`. 
:::

:::tip Virtual vs Parent elections
You will note that there are two different possible types of relations between 
elections:
1. A [virtual election](#election-virtual) and its respective 
[virtual subelections](#election-virtualSubelections).
2. A [parent election](#election-parent_id) and its respective 
[children elections](#election-children_election_info).

The first kind of relation (virtual elections and virtual subelections) is 
established in `agora-elections`, and its use is allows for electoral results
consolidation.

The second kind of relation is established in `authapi` and its use is more
related to the authentication, authorization and presentation behaviour in the
earlier stages of an election, for example during login.

Both are closely related/coupled, because usually you want to do both or none. 
The separation exists simply because `authapi` and `agora-elections` are
different modules that have separated databases.
:::

If set to `true`, this is a virtual election, meaning it can have subelections
in `agora-elections`. This allows the election results to be calculated when
calling [agora-results](#results-config-pipes) with the votes of all the 
subelections, and thus allows you to do electoral results consolidation. Set the 
[virtualSubelections setting](#election-virtualSubelections) to specify which
are those subelections.

### Election: `virtualSubelections`

- **Property name**: `virtualSubelections`
- **Type:** `List<Positive Integer>`
- **Required:** No
- **Default:** `[]`
- **Example:** 
```json
[
  41004,
  41005,
  41006
]
```

List of [election ids](#election-id) that will be used for virtual subelections.
See the information in [virtual setting](#election-virtual) for more details.

### Election: `parent_id`

- **Property name**: `parent_id`
- **Type:** `Positive Integer | null`
- **Required:** No
- **Default:** `null`
- **Example:** `66341`

Identification number of the parent election, or more specifically `AuthEvent`,
because this is an attribute set in `authapi`. `parent_id` is set in children
elections. It can only be set to refer to a parent `AuthEvent`'s that exist, so
you will have to create the parent election first. If you are creating multiple
elections in a single `Edit JSON elections`, then also place the parent first.

When a set of election have a parent-children relationship, they have the 
following behaviour:
1. In the Admin election list, the children elections are hidden by default and
only shown as a dropdown of the parent election.
2. In the Admin election dashboard, the parent election can manage the children
elections. For example starting or stopping the parent election starts/stops 
the children elections automatically. The parent election dashboard also allows
to trigger the tally of specific subelections with a chooser widget, and also
allows to switch to see the election results of specific children elections.
3. In the Admin election Census Data, you can assign to each voter a subset of 
the children elections, to allow a specific subset of children elections. The
Census Data section also allows you to view in which children elections has any
voter voted.
4. In the parent election results public website, there's a chooser widget to
choose which children election results to visualize.
5. In the voting booth, after authentication the voter will vote without having
to authenticate again in  the assigned children election in their 
[natural order](#child-election-natural_order) sequentially. If a voter does 
not vote to all the children elections assigned to this voter, then he will be
able to authenticate again and vote in the next unvoted children election.

See the [children_election_info setting](#election-children_election_info) for
more details about how to set the list of children elections in a parent. Also
read about the [virtual election setting](#election-virtual) to learn about
the differences of virtual and parent elections.


### Election: `children_election_info`

- **Property name**: `children_election_info`
- **Type:** [Children Election Info](#children-election-info-object) | `null`
- **Required:** No
- **Default:** `null`
- **Related:**
  - [Election: `parent_id`](#election-parent_id)
  - [Election: `virtual`](#election-virtual)
  - [Children Election Info](#children-election-info-object)
- **Example:**
```json
{
  "natural_order": [
    41004,
    41005,
    41006
  ],
  "presentation": {
    "categories": [
      {
        "events": [
          {
            "event_id": 41004,
            "title": "Executive Board"
          }
        ],
        "id": 1,
        "title": "Board"
      },
      {
        "events": [
          {
            "event_id": 41005,
            "title": "Sector 1"
          },
          {
            "event_id": 41006,
            "title": "Sector 2"
          }
        ],
        "id": 2,
        "title": "Sectorial"
      }
    ]
  }
}
```

Describes the information related to the children elections. `null`, which is
the default value, if this is not a parent election. See 
[Children Election Info](#children-election-info-object) for details.

### Election: `director`

- **Property name**: `director`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `"auth1"`

The name of the election authority that will act as the director for this 
election. Its eopackage needs to be installed in the backend server 
([see details](../deployment/guide#connecting-web-servers-with-authorities)).

### Election: `authorities`

- **Property name**: `authorities`
- **Type:** `List<String>`
- **Required:** Yes
- **Default:** -
- **Example:** `["auth2", "auth3"]`

List of names of all the election authorities that should be included in this 
election, excluding the director authority name. Its eopackages needs to be 
installed in the backend server 
([see details](../deployment/guide#connecting-web-servers-with-authorities)).
### Election: `questions`

- **Property name**: `questions`
- **Type:** List<[Question](#question-object)>
- **Required:** No
- **Default:** -
- **Example:**
```json
[
  {
    "answer_total_votes_percentage": "over-total-valid-votes",
    "answers": [
      {
        "category": "",
        "details": "This is an option with an simple example description.",
        "id": 0,
        "sort_order": 0,
        "text": "Example option 1",
        "urls": [
          {
            "title": "URL",
            "url": ""
          },
          {
            "title": "Image URL",
            "url": ""
          }
        ]
      },
      {
        "category": "",
        "details": "An option can contain a description. You can add simple html like <strong>bold</strong> or <a href=\"https://nvotes.com\">links to websites</a>. You can also set an image url below, but be sure it's HTTPS or else it won't load.\n\n<br><br>You need to use two br element for new paragraphs.",
        "id": 1,
        "sort_order": 1,
        "text": "Example option 2",
        "urls": [
          {
            "title": "URL",
            "url": "https://nvotes.com"
          },
          {
            "title": "Image URL",
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/220px-The_Fabs.JPG"
          }
        ]
      },
      {
        "category": "",
        "details": "",
        "id": 2,
        "sort_order": 2,
        "text": "Example option 3",
        "urls": [
          {
            "title": "URL",
            "url": ""
          },
          {
            "title": "Image URL",
            "url": ""
          }
        ]
      }
    ],
    "description": "This is the description of this question. You can have multiple questions. You can add simple html like <strong>bold</strong> or <a href=\"https://nvotes.com\">links to websites</a>.\n\n<br><br>You need to use two br element for new paragraphs.",
    "layout": "accordion",
    "max": 1,
    "min": 1,
    "num_winners": 1,
    "tally_type": "plurality-at-large",
    "title": "Test question title",
    "extra_options": {
      "shuffle_categories": true,
      "shuffle_all_options": true,
      "shuffle_category_list": [],
      "show_points": false
    },
    "active": true
  }
]
```

List of questions in the election. See [Question](#question-object) for more 
details.

### Election: `presentation`

- **Property name**: `presentation`
- **Type:** [Election Presentation](#election-presentation-object)
- **Required:** Yes
- **Default:** -
- **Example:** 
```json
{
      "theme": "default",
      "share_text": [
        {
          "network": "Twitter",
          "button_text": "",
          "social_message": "I have just voted in election __URL__, you can too! #nvotes"
        },
        {
          "network": "Facebook",
          "button_text": "",
          "social_message": "__URL__"
        }
      ],
      "urls": [],
      "theme_css": ""
    }
```

Describes presentation options related to the whole election. See 
[Election Presentation](#election-presentation-object) for more details.

### Election: `layout`

- **Property name**: `layout`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `"simple"`

Specifies the election-wide layout. For now this settings remains unused and it
must always be set to `"simple"`.

### Election: `num_successful_logins_allowed`

- **Property name**: `num_successful_logins_allowed`
- **Type:** `Positive Integer`
- **Required:** Yes
- **Default:** -
- **Example:** `0`

Specifies the number of votes that can be cast, because *successful logins* is
a generic and fancy way to call 'votes cast' in a generic way within AuthApi.
If set to zero, no specific limitation in `authapi` will happen regarding the 
authentication process. If set to a number higher than zero, for example 1 or 3,
that will be the limit in the number of votes that can be cast.

Once the limitation is hit, the voter won't be able to authenticate again to
cast a vote.

:::note
There might be other limitations on the number of votes that a voter can cast.
For example `agora-elections` has a deployment level configuration setting
that limits the number of votes that can be cast (this setting's path is 
`config.agora_elections.max_revotes` in the `config.yml` ansible configuration).
This `agora-elections` configuration setting will be applied independently of
`num_successful_logins_allowed`.
:::

### Election: `resultsConfig`

- **Property name**: `resultsConfig`
- **Type:** Object
- **Required:** No
- **Default:** -
- **Example:**
```json
{
  "version": "1.0",
  "pipes": [
    {
      "type": "agora_results.pipes.results.do_tallies",
      "params": {
        "ignore_invalid_votes": true
      }
    },
    {
      "type": "agora_results.pipes.sort.sort_non_iterative",
      "params": {
        "question_indexes": [0]
      }
    }
  ]
}
```

Specifies how election results will be calculated. It contains in the `pipes`
parameter a set of pipes to be applied, together with each pipe configuration, 
that will be used during the  calculation of election results. See 
[Results Config Pipes](#results-config-pipes) for more details.

### Election: `has_ballot_boxes`

- **Property name**: `has_ballot_boxes`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Specifies if this election will have paper ballot boxes. If set to `true`, the
election will show a new `Balot Boxes` tab in the sidebar once created. In that
tab a list of ballot boxes will be shown, and each ballot box will be able to
have a tally sheet attached. This can be used for hybrid elections with both
digital votes and paper ballots. 

A single election can have multiple ballot boxes assigned to it. Each ballot
box can be assigned via the [`ballot_boxes`](#election-ballot_boxes) election
object property.

The way election results are calculated when there are ballot boxes is through
multiple steps:
1. When a tally sheet is uploaded (to `authapi`), `authapi` sends a callback to
   `agora-elections` (the API call is to 
   `/api/election/:id/update-ballot-boxes-config`) with the updated list of 
   tally sheets related to that election.
2. That API call to `/api/election/:id/update-ballot-boxes-config` of
   `agora-elections` executes multiple steps:
    1. It sets the `ballotBoxesResultsConfig` in the appropiate election and 
       saves it in the database.
    2. It uses the [resultsConfig setting](#election-resultsconfig) as a 
       template replacing any ocurrence of the text 
       `__ballotBoxesResultsConfig__` with the content of
       `ballotBoxesResultsConfig` which is the updated list of tally sheets. If
       ballotBoxesResultsConfig is not set, then `__ballotBoxesResultsConfig__` 
       will be always replaced by `[]` (empty list).
    3. It re-calculates the election results running `agora-results` with the
       calculated [resultsConfig setting](#election-resultsconfig) in the previous
       step.

As a result, if you want the tally sheets to be reflected somehow in the 
election results, you will need to use the appropiate 
[Results Config Pipes](#results-config-pipes), for example [agora_results.pipes.ballot_boxes.count_tally_sheets](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/ballot_boxes.py#L278). See also [Election results can have different questions](#election-results-can-have-different-questions) section.

### Election: `ballot_boxes`

- **Property name**: `ballot_boxes`
- **Type:** `List<Short String>`
- **Required:** No
- **Default:** `[]`
- **Example:** `["Postal Ballots", "Onsite Paper Ballots"]`

This configuration option is only used if 
[has_ballot_boxes](#election-has_ballot_boxes) is set to true. It contains a
list of ballot boxes to be created.

### Election: `census`

- **Property name**: `census`
- **Type:** List<[Census](#census-object)>
- **Required:** Yes
- **Default:** -
- **Example:**
```json
{
  "voters": [],
  "auth_method": "email",
  "census": "close",
  "extra_fields": [],
  "admin_fields": [],
  "config": {
    "allow_user_resend": true,
    "msg": "Vote in __URL__ with code __CODE__",
    "subject": "Vote now with nVotes",
    "authentication-action": {
      "mode": "vote",
      "mode-config": {
        "url": ""
      }
    },
    "registration-action": {
      "mode": "vote",
      "mode-config": null
    }
  }
}
```

Object that details the different options related to the census configuration.
See [Census](#census-object) for more details.

### Election: `hide_default_login_lookup_field`

- **Property name**: `hide_default_login_lookup_field`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Specifies if the census main lookup field is hidden. Only use this option if
you have setup some other(s) [census extra_field](#census-extra_fields) with the
[required_on_authentication attribute](#extra-field-required_on_authentication) 
set to `true`, as it would be used to look up the voter in the database.

### Election: `allow_public_census_query`

- **Property name**: `allow_public_census_query`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Specifies if voters at any time can access the website to consult if their
voter is part of the census. Disabled by default. If enabled, a link to this
page will appear in the public election website. The public census query is
implemented in a very similar way to the login form, but without sending any
One Time Passwords and instead of authenticating the user to vote it shows the
user if he will be able to vote, even before or after the voting process starts.

### Election: `logo_url`

- **Property name**: `logo_url`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"https://example.com/path/to/logo.png"`

URL of the logo to be shown in public election site and voting booth in the
page header.

### Election: `start_date`

- **Property name**: `start_date`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `""`

UNUSED. This field is required but should really be an empty string as it is currently unused.

### Election: `end_date`

- **Property name**: `end_date`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `""`

UNUSED. This field is required but should really be an empty string as it is currently unused.

## Election Presentation Object

This JSON object type describes presentation options related to the whole 
election. It is used [here](#election-presentation) and can have the following 
properties:

### Election Presentation: `theme`

- **Property name**: `theme`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `"default"`

Theme that will be used in the public election website and in the voting booth
of this election. Existing themes exist in the [themes directory](https://github.com/agoravoting/agora-gui-common/tree/master/themes) of the agora-gui-common repository. You can write
your own if need be, by following the same directory and file structure as any
of those. The `default` theme uses simple colors and not very specific, with 
the idea of being able to be used in most cases. It is also the most widely used
and thus battle-tested.

### Election Presentation: `share_text`

- **Property name**: `share_text`
- **Type:** List<[Share Text](#share-text-object)>
- **Required:** Yes
- **Default:** -
- **Example:**
```json
[
  {
    "network": "Twitter",
    "button_text": "",
    "social_message": "I have just voted in election __URL__, you can too! #nvotes"
  },
  {
    "network": "Facebook",
    "button_text": "",
    "social_message": "__URL__"
  }
]
```

Describes a series of social network or other kind of links to be shown at the 
top of the election public website and at the success screen of the voting 
booth. See [Share Text](#share-text) for more details. It can be an empty list.

### Election Presentation: `urls`

- **Property name**: `urls`
- **Type:** `List<Election URL>`
- **Required:** Yes
- **Default:** -
- **Example:** `[]`

DEPRECATED. Just leave it as an empty list.

### Election Presentation: `theme_css`

- **Property name**: `theme_css`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `""`

DEPRECATED. Just leave it as an empty string.

### Election Presentation: `extra_options`

- **Property name**: `extra_options`
- **Type:** [Election Presentation Extra Options](#election-presentation-extra-options-object)
- **Required:** No
- **Default:** -
- **Example:** 
```json
{
  "start_screen__skip": true
}
```

A set of additional of election configuration options, currently used to modify
the voting booth presentation behaviour. This property is not required, but can
be useful. See more 
[details about Election Presentation Extra Options here](#election-presentation-extra-options-object).

## Share Text Object

Object describing a series of social network links or any other type of link
to be shown at the top of the election public website and at the success screen 
of the voting  booth. It  is used [here](#election-presentation-share_text) and
it can have the following properties:

### Share Text: `network`

- **Property name**: `network`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `"Twitter"`

Specifies the social network this link is for. Currently only `"Twitter"` and 
`"Facebook"` special cases are detected. If you use any of those, then a given
social network icon will be shown and the url will be set to share the 
specified [social message](#share-text-social_message).

### Share Text: `button_text`

- **Property name**: `button_text`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `""`

Specifies the text to show with this share link. It's usually set to an empty
string as the network icon is usually set.

### Share Text: `social_message`

- **Property name**: `social_message`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Example:** `"I have just voted in election __URL__, you can too! #nvotes"`

When users click on the share link, it will try automatically default to share
in Twitter/Facebook this message. It is a template string, where `__URL__` will
be automatically replaced to a link to this election's public website.

Currently unused.

## Election Presentation Extra Options Object

An object describing a set of additional of election configuration options, 
currently used to modify the voting booth presentation behaviour. It is used 
[here](#election-presentation-extra_options) and it can have the following 
properties:

### Election Presentation Options: `start_screen__skip`

- **Property name**: `start_screen__skip`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour and the
start screen of the voting booth will not be shown.

### Election Presentation Options: `public_title`

- **Property name**: `public_title`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"Approval of the accounts 2022"`

If set, this optional property will modify the voting booth behaviour so that
instead of showing the title of election in the voting booth, it will show this
other title instead.
### Election Presentation Options: `success_screen__hide_ballot_tracker`

- **Property name**: `success_screen__hide_ballot_tracker`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour and the
success screen will not show the ballot tracker hash. This option does not hide
the QR code nor the link to download the ballot ticket PDF.
### Election Presentation Options: `success_screen__hide_qr_code`

- **Property name**: `success_screen__hide_qr_code`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour and the
success screen will not show the QR code that encodes a link to the ballot 
tracker URL. This option does not hide the ballot tracker hash nor the link
to download the ballot ticket PDF.

### Election Presentation Options: `success_screen__hide_download_ballot_ticket`

- **Property name**: `success_screen__hide_download_ballot_ticket`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`
- **Related:**
  - [`success_screen__ballot_ticket__logo_header`](#election-presentation-options-success_screen__ballot_ticket__logo_header)
  - [`success_screen__ballot_ticket__logo_subheader`](#election-presentation-options-success_screen__ballot_ticket__logo_subheader)
  - [`success_screen__ballot_ticket__h3`](#election-presentation-options-success_screen__ballot_ticket__h3)
  - [`success_screen__ballot_ticket__h4`](#election-presentation-options-success_screen__ballot_ticket__h4)

If set, this optional property will modify the voting booth behaviour and the
success screen will not show the link to download the ballot ticket PDF. This 
option does not hide the ballot tracker hash nor the QR code to the ballot 

### Election Presentation Options: `success_screen__ballot_ticket__logo_url`

- **Property name**: `success_screen__ballot_ticket__logo_url`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"https://example.com/path/to/logo.png"`
- **Related:**
  - [`success_screen__hide_download_ballot_ticket`](#election-presentation-options-success_screen__hide_download_ballot_ticket)
  - [`success_screen__ballot_ticket__logo_header`](#election-presentation-options-success_screen__ballot_ticket__logo_header)
  - [`success_screen__ballot_ticket__logo_subheader`](#election-presentation-options-success_screen__ballot_ticket__logo_subheader)
  - [`success_screen__ballot_ticket__h3`](#election-presentation-options-success_screen__ballot_ticket__h3)
  - [`success_screen__ballot_ticket__h4`](#election-presentation-options-success_screen__ballot_ticket__h4)

If set, this optional property will modify the heading logo that appears next 
in the PDF ballot ticket that the voter can download from  the voting booth 
success screen.

By default, if this optional property is not set, then the  election's
`logo_url` property is tried to be used as the logo, and if not, the 
`config.agora_gui.organization.big_logo_url` property in the deployment YAML 
is used to load the logo, or otherwise no logo is shown in the ballot ticket 
PDF.

### Election Presentation Options: `success_screen__ballot_ticket__logo_header`

- **Property name**: `success_screen__ballot_ticket__logo_header`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"nVotes"`
- **Related:**
  - [`success_screen__hide_download_ballot_ticket`](#election-presentation-options-success_screen__hide_download_ballot_ticket)
  - [`success_screen__ballot_ticket__logo_url`](#election-presentation-options-success_screen__ballot_ticket__logo_url)
  - [`success_screen__ballot_ticket__logo_subheader`](#election-presentation-options-success_screen__ballot_ticket__logo_subheader)
  - [`success_screen__ballot_ticket__h3`](#election-presentation-options-success_screen__ballot_ticket__h3)
  - [`success_screen__ballot_ticket__h4`](#election-presentation-options-success_screen__ballot_ticket__h4)

If set, this optional property will modify the heading text that appears next 
to the header logo in the PDF ballot ticket that the voter can download from 
the voting booth success screen.

By default, if this optional property is not set, then the 
`config.agora_gui.organization.name` property in the deployment YAML appears 
in the same position in the ballot ticket PDF.

### Election Presentation Options: `success_screen__ballot_ticket__logo_subheader`

- **Property name**: `success_screen__ballot_ticket__logo_subheader`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"Subheader line"`
- **Related:**
  - [`success_screen__hide_download_ballot_ticket`](#election-presentation-options-success_screen__hide_download_ballot_ticket)
  - [`success_screen__ballot_ticket__logo_url`](#election-presentation-options-success_screen__ballot_ticket__logo_url)
  - [`success_screen__ballot_ticket__logo_header`](#election-presentation-options-success_screen__ballot_ticket__logo_header)
  - [`success_screen__ballot_ticket__h3`](#election-presentation-options-success_screen__ballot_ticket__h3)
  - [`success_screen__ballot_ticket__h4`](#election-presentation-options-success_screen__ballot_ticket__h4)

If set, this optional property will modify the subheading text that appears next 
to the header logo in the PDF ballot ticket that the voter can download from the 
voting booth success screen.

By default, if this optional property is not set, then the 
`config.agora_gui.organization.subtitle` property in the deployment YAML appears 
in the same position in the ballot ticket PDF.

### Election Presentation Options: `success_screen__ballot_ticket__h3`

- **Property name**: `success_screen__ballot_ticket__h3`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"Vote receipt"`
- **Related:**
  - [`success_screen__hide_download_ballot_ticket`](#election-presentation-options-success_screen__hide_download_ballot_ticket)
  - [`success_screen__ballot_ticket__logo_url`](#election-presentation-options-success_screen__ballot_ticket__logo_url)
  - [`success_screen__ballot_ticket__logo_header`](#election-presentation-options-success_screen__ballot_ticket__logo_header)
  - [`success_screen__ballot_ticket__logo_subheader`](#election-presentation-options-success_screen__ballot_ticket__logo_subheader)
  - [`success_screen__ballot_ticket__h4`](#election-presentation-options-success_screen__ballot_ticket__h4)

If set, this optional property will modify the title of the ballot ticket 
that appears below the header logo in the PDF ballot ticket that the voter can 
download from the voting booth success screen.

By default, if this optional property is not set, then an i18n string saying
`Vote receipt` will appear in the same position in the ballot ticket PDF.

### Election Presentation Options: `success_screen__ballot_ticket__h4`

- **Property name**: `success_screen__ballot_ticket__h4`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"Your vote has been cast correctly. This document justifies its issuance."`
- **Related:**
  - [`success_screen__hide_download_ballot_ticket`](#election-presentation-options-success_screen__hide_download_ballot_ticket)
  - [`success_screen__ballot_ticket__logo_url`](#election-presentation-options-success_screen__ballot_ticket__logo_url)
  - [`success_screen__ballot_ticket__logo_header`](#election-presentation-options-success_screen__ballot_ticket__logo_header)
  - [`success_screen__ballot_ticket__logo_subheader`](#election-presentation-options-success_screen__ballot_ticket__logo_subheader)
  - [`success_screen__ballot_ticket__h3`](#election-presentation-options-success_screen__ballot_ticket__h3)

If set, this optional property will modify the text of the ballot ticket 
that appears below the title of the PDF ballot ticket that the voter can 
download from the voting booth success screen.

By default, if this optional property is not set, then an i18n string saying
`Your vote has been cast correctly. This document justifies its issuance.` 
will appear in the same position in the ballot ticket PDF.

### Election Presentation Options: `success_screen__redirect__url`

- **Property name**: `success_screen__redirect__url`
- **Type:** `Short String`
- **Required:** No
- **Default:** -
- **Example:** `"https://myvotingplace.com"`
- **Related:**
  - [`success_screen__redirect_to_login`](#election-presentation-options-success_screen__redirect_to_login)
  - [`success_screen__redirect_to_login__text`](#election-presentation-options-success_screen__redirect_to_login__text)
  - [`success_screen__redirect_to_login__auto_seconds`](#election-presentation-options-success_screen__redirect_to_login__auto_seconds)

If set, this optional property will modify the voting booth behaviour so that 
when the success screen is going to redirect to the login screen, it will 
redirect to this URL instead. This means that if there's an automatic 
redirect to login or a redirect to login button (using [success_screen__redirect_to_login](#election-presentation-options-success_screen__redirect_to_login)), all this
redirect links will go to this url instead.
### Election Presentation Options: `success_screen__redirect_to_login`

- **Property name**: `success_screen__redirect_to_login`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`
- **Related:**
  - [`success_screen__redirect__url`](#election-presentation-options-success_screen__redirect__url)
  - [`success_screen__redirect_to_login__text`](#election-presentation-options-success_screen__redirect_to_login__text)
  - [`success_screen__redirect_to_login__auto_seconds`](#election-presentation-options-success_screen__redirect_to_login__auto_seconds)

If set, this optional property will modify the voting booth behaviour so that 
the success screen will show a link to redirect to the voter login page. Use
together with [`success_screen__redirect_to_login__text`](#election-presentation-options-success_screen__redirect_to_login__text)
because the link will have that text, so you need to set it.

### Election Presentation Options: `success_screen__redirect_to_login__text`

- **Property name**: `success_screen__redirect_to_login__text`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `Go to login`
  - [`success_screen__redirect__url`](#election-presentation-options-success_screen__redirect__url)
  - [`success_screen__redirect_to_login`](#election-presentation-options-success_screen__redirect_to_login)
  - [`success_screen__redirect_to_login__auto_seconds`](#election-presentation-options-success_screen__redirect_to_login__auto_seconds)

If set, this optional property will modify the voting booth behaviour so that 
the redirect to login link in the  success screen will have the text specified
in this string. Use
together with [success_screen__redirect_to_login](#election-presentation-options-success_screen__redirect_to_login)
because the link will only appear if that option is set to `true`.

### Election Presentation Options: `success_screen__redirect_to_login__auto_seconds`

- **Property name**: `success_screen__redirect_to_login__auto_seconds`
- **Type:** `Positive Integer`
- **Required:** No
- **Default:** -
- **Example:** `10`
  - [`success_screen__redirect__url`](#election-presentation-options-success_screen__redirect__url)
  - [`success_screen__redirect_to_login`](#election-presentation-options-success_screen__redirect_to_login)
  - [`success_screen__redirect_to_login__text`](#election-presentation-options-success_screen__redirect_to_login__text)

If set, this optional property will modify the voting booth behaviour so that 
once the ballot is cast and the success screen is shown, after the specified
number of seconds the voter will be automatically redirected to the login page.

### Election Presentation Options: `disable_voting_booth_audit_ballot`

- **Property name**: `disable_voting_booth_audit_ballot`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour so that 
the review ballot screen, shown before casting the vote, will not show the hash
of the ballot nor the link to audit the ballot.

### Election Presentation Options: `review_screen__split_cast_edit`

- **Property name**: `review_screen__split_cast_edit`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour so that 
the review screen instead of showing below just the button for 
`Cast your ballot` it will also show a button to `Edit ballot`, showing both
side by side (50% of horizontal space for each).

### Election Presentation Options: `show_skip_question_button`

- **Property name**: `show_skip_question_button`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set, this optional property will modify the voting booth behaviour so that 
it will show `Skip question(s)` link over the `Continue` button to skip to the
next question. Only support for `simultaneous-questions` layout.

## Results Config Pipes

A results config pipe is used to specify how election results will be calculated. 
Results configuration is set of pipes to be applied, together with each pipe 
configuration, that will be used during the  calculation of election results. It
is configured at the election level with the 
[resultsConfig setting](#election-resultsconfig).

Each pipe is a list of pipe objects with two items:
1. The pipe import path (the `"type"` key)
2. An object with that specific pipe configuration (the `"params"` key)

For example, a config object could be:

```json
{
  "type": "agora_results.pipes.sort.sort_non_iterative",
  "params": {
    "question_indexes": [0]
  }
}
```

And multiple pipes can be included in the top-level `resultsConfig` setting
with:

```json
{
  "version": "1.0",
  "pipes": [
    {
      "type": "agora_results.pipes.results.do_tallies",
      "params": {}
    },
    {
      "type": "agora_results.pipes.sort.sort_non_iterative",
      "params": {
        "question_indexes": [0]
      }
    }
  ]
}
```

The pipes are interpreted and applied by 
[agora-results](https://github.com/agoravoting/agora-results), which in turn is
called by `agora-elections`. There are multiple available pipes and we will 
document in this section most of them, what they do, what you can use them for 
and what are their configuration  options.

:::note
There's a deployment level configuration setting that specifies a whitelist of
pipes that can be used. This setting's path is 
`config.agora_results.pipes_whitelist` in the `config.yml` ansible 
configuration). If you need to use a specific pipe, please ensure you
have whitelisted it in the deployment configuration.
:::

### Election results input

`agora-results` is called with multiple input data:
- The path to the list of votes to be decrypted.
- The path to the election results configuration with all the pipes to be run.
- The path to the election tally tarball. This tarball is generated by election
authorities and contains among other things a file with the list of questions,
the different options available for each question, the tally mechanism, etc.
- The `output directory` where the election tally results in different formats 
should be written in different files.
- The election id.
- The path to a file containing the whitelisted pipes.

`agora-results` works by loading the election questions configuration, and 
passing it from pipe to pipe as the first argument of each pipe, called 
`data_list`. It also untars the election tally tarball in a temporal directory, 
which some pipes might use to output some temporal files too.

In virtual elections, `agora-results` not only receives as an input the tarball
of the [virtual election](#election-virtual), but also the tarball of all the 
[virtual subelections](#election-virtualSubelections). 

In that case, `agora-results` will also load that election's question 
configuration in the `data_list` pipes argument and extract each tally tarball
in a different temporal directory. This is what allows us to do
results consolidation from multiple elections into a single one. In virtual
elections, the first element in `data_list` is the configuration of the virtual
election and then follows in order the list of virtual subelections as per the
configuration of the election in `agora-elections`. Within each element in
`data_list` there's an additional key `extract_dir` that pipes can use to 
access the details of the tally tarball of a specific subelection.

### Election results output

The output of `agora-results` is usually directly to stdout in a specific 
format. This is read by `agora-elections` and stored in the database as the 
electoral results. But it also outputs the same electoral results in different
formats in the election `output directory`: `csv`, `json`, `pretty` (plain
text) and `pdf`. It will also save the ballots in JSON format in the 
`output directory`. The `output directory` is served with `agora-elections` as
a private directory where results can be accessed when the election results are
not public, and then as a public directory where anyone can access the election
results when the election status is set to `publish results`. The results in the
`output directory` will contain with the following files:
 - `<election-id>.results.csv`
 - `<election-id>.results.json`
 - `<election-id>.results.pretty`
 - `<election-id>.results.pdf`
 - `ballots.csv`
 - `ballots.json`

`agora-results` works so that the pipes execute sequentially and communicate 
with one another mainly through passing information via the mutable `data_list` 
argument and also writting information in the temporal tarball extraction 
directories. The final output is the results configuration (which is in 
different formats and files). But one important feature is that it might contain
a list of questions different of that one of the election configuration question
list. This is because there are some pipes that can duplicate questions and
consolidate electoral results. 

### Election results can have different questions

For example, it might make sense that if you have an election with ballot boxes
enabled, you might have only one question in the digital election but that two
different ballot boxes, one ballot box for Mail-in ballots and another for 
Onsite paper ballots. You could have election results for this election to 
contain four different tallied questions (even if the election had only one 
question):
- A tally of the digital votes
- A tally of the mail-in votes (from the Mail-in ballots box)
- A tally of the paper ballots (from the Paper ballots box)
- Consolidated results of all the previous ones together

To do that, you would also have to change the title of the duplicated questions
so that you can easily see which question corresponds with which tally. There 
are pipes to do that.

What follows is a list of the results configuration pipes in no particular
order:

### Pipe: `do_tallies`

- **Pipe path**: [`agora_results.pipes.results.do_tallies`](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/results.py#L24)
- **Example usage**:
```json
{
  "type": "agora_results.pipes.results.do_tallies",
  "params": {
    "question_indexes": [0]
  }
}
```

This pipe is used to run the `tally` algorithm of the election questions. It
will calculate the results using that `tally` algorithm and set them in the 
`results` key in the appropiate element inside `data_list`, among other things. 
`results` is used later by `agora-results` to output the electoral results in 
the appropiate format. It also sets the `log` key in the appropiate element 
inside `data_list` if the tally algorithm generated any log output.

This pipe calls uses the [agora-tally](https://github.com/agoravoting/agora-tally) 
library and calls to `agora_tally.tally.do_tally` to do the results calculation
of any question to be tallied.

Candidates marked as withdrawn (you can do that with the 
[apply_modifications pipe](#pipe-apply_modifications) ) will not be counted 
during the tally.

The following configuration options can be set in the pipe configuration object:

#### `do_tallies`: `ignore_invalid_votes`

- **Property name**: `ignore_invalid_votes`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `true`
- **Example:** `false`

If this option is set to `true` as it is by default, having invalid votes will 
not make the tally fail. If it is set to `false`, then the call to 
`agora_tally.tally.do_tally` will raise an exception and the `agora-results`
execution will fail. 

If you are not expecting any invalid votes, setting `ignore_invalid_votes` to 
`false` might be a way to ensure that you don't overlook any invalid vote.

#### `do_tallies`: `print_as_csv`

- **Property name**: `print_as_csv`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If this option is set to `false` as it is by default, it will output to stdout
the ballots as they are read in CSV format. This option is currently unused most
of the time as the `agora-results` already outputs the ballots in CSV and JSON 
formats (the `ballots.csv` and `ballots.json` files). By the way, those ballot 
files are generated by this pipe and using the same code as this setting uses.

#### `do_tallies`: `tallies_indexes`

- **Property name**: `tallies_indexes`
- **Type:** `List<Positive Integer> | None`
- **Required:** No
- **Default:** `None`
- **Example:** `[0,1,2,4,6]`

List of indexes in `data_list` to tally or None if all of them should be 
tallied which is the default. Note that this is a filtering list. It will not
error if any index of this list is out of bounds. If this a virtual election
and `agora-results` received 2 tallies as input, if `tallies_indexes` is
`[0,1,2,3]` it will actually only tally the first two.

#### `do_tallies`: `question_indexes`

- **Property name**: `question_indexes`
- **Type:** `List<Positive Integer> | None`
- **Required:** No
- **Default:** `None`
- **Example:** `[0,1,2]`

List of question to tally for each of the tallies being tallied or None if all 
of them should be tallied which is the default. Two notes:
- This is a filtering list. It will not error if any index of this list is out 
of bounds. If there is only a single question but `question_indexes` is set to
`[0,1,2,3,4]`, this pipe will just tally the first question without any error.
- This list of question indexes is applied to all elections. To apply different
`question_indexes` for different elections you would have to have in your pipes
configuration multiple calls to the `do_tallies` with different settings. See
[reuse_results](#do_tallies-reuse_results) for some details on that.

#### `do_tallies`: `reuse_results`

- **Property name**: `reuse_results`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

As mentioned before, this pipe heavy lifting is actually done by calling to
`agora_tally.tally.do_tally`. This function call receives the question 
configuration as an object using the `question_json` parameter. Usually this 
configuration is obtained by reading the question json file within the tally 
tarball temporal extraction directory. However, if `reuse_results` is set to 
`true`, then the `question_json` parameter will be loaded with an object from 
the given  element inside `data_list`: 
`data_list[<index>]['results']['questions']`.

This can be useful in different circumstances. For example if for some reason 
like the one mentioned in [question_indexes](#do_tallies-question_indexes), you
need to execute multiple runs of this pipe within the same `agora-results` 
execution.

#### `do_tallies`: `allow_empty_tally`

- **Property name**: `allow_empty_tally`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set to `true` (the default is `false`), the tally will not fail even if there
is an empty list of ballots being tallied.

#### `do_tallies`: `help`

- **Property name**: `help`
- **Type:** `String`
- **Required:** No
- **Default:** `""`
- **Example:** `"Some explanation"`

Most if not all of the pipes receive the `help` argument. This is a way for the
writter of the results configuration pipes to explain anything relating to this
particular pipe + pipe configuration pair, as usually configuration is in JSON
format which does not allow for comments.

### Pipe: `sort_non_iterative`

- **Pipe path**: [`agora_results.pipes.sort.sort_non_iterative`](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/sort.py#L35)
- **Example usage**:
```json
{
  "type": "agora_results.pipes.sort.sort_non_iterative",
  "params": {
    "question_indexes": [0, 1]
  }
}
```

Pipe used to sort the answers in `data_list[<index>]['results']['questions'][<index2>]['answers']`
and assigning a `winner_position` depending on the question's `num_winners`
setting. This sort is by answer points (the answer's `total_count` property) 
and thus is only applied for questions whose `tally_type` algorithm is 
non-iterative, like `plurality-at-large` or `borda`. The answer list will be
reordered to ensure that winners always appears before other candidates, and 
can also be used for tie resolution using the `ties_sorting` argument.

A Single-Transferable Vote (STV) tally method uses an iterative process to 
obtain winners so results cannot be sorted by this pipe. This pipe uses a 
`tally_type` whitelist to ensure it is only applied for non-iterative tally 
methods, simply skipping any other question with any other tally method.

This pipe also takes into account during sorting candidate withdrawals and can
apply specific withdrawls at this stage using the `withdrawals` option, or 
apply the `withdrawals` of candidate options that were recorded as withdrawn by
a previous pipe (like the 
[apply_modifications pipe](#pipe-apply_modifications)).

This pipe can be used to apply candidate removals, which means that a candidate
option will not appear in the election results. 

:::note Different forms of withdrawal

Multiple withdrawal methods are available and it's your responsability to know
them and use them as required.

When a candidate is withdrawed for example using the 
[apply_modifications pipe](#pipe-apply_modifications), if that withdrawal is 
marked as such before executing  the [do_tallies pipe](#pipe-do_tallies), then
the candidate option will not be counted. If after `do_tallies` you execute
the `sort_non_iterative` pipe, then it will also ensure it is not marked as a 
winner. Note that the ordering of the pipes matter: if you apply the withdrawal
with `apply_modifications` after having run `do_tallies` and having 
`sort_non_iterative` as the last applied pipe (So the order of pipes is 
`[do_tallies, apply_modifications, sort_non_iterative]`), the candidate will 
not appear as a winner because `sort_non_iterative` will detect that it's 
withdrawed, but it will have the same number of points in the election results 
as it was not marked as withdrawed when the `do_tallies` was executed.

The [apply_modifications pipe](#pipe-apply_modifications) can withdraw a 
candidate but it can also directly be withdrawn by this `sort_non_iterative`
pipe, but then the points obtained will not change because the expected previous 
call to the `do_tallies` pipe will not have been marked the candidate as 
withdrawed. 
::::

:::note Candidate Withdrawal vs Removal
There are important differences between candidate removal and withdrawal. The 
[apply_modifications pipe](#pipe-apply_modifications) can be used to mark a
candidate option as either withdrawed or Removed. When a candidate is marked as
removed, the `sort_non_iterative` pipe will remove the candidate option from
the election results. 

If you don't need to sort the results, candidate removal can be also applied
directly with the [apply_removals pipe](#pipe-apply_removals). And of course,
remember that you can do both a withdrawal and removal, so that the candidate
option is both not counted and removed from the election results.
:::

The following configuration options can be set in the pipe configuration object:

#### `sort_non_iterative`: `tallies_indexes`

- **Property name**: `tallies_indexes`
- **Type:** `List<Positive Integer> | None`
- **Required:** No
- **Default:** `[0]`
- **Example:** `[0,1,2,4,6]`

List of indexes in `data_list` to which this pipe will be applied or None if 
this pipe should be run for all the elections. Note that this is a filtering 
list. It will not give any error if any index of this list is out of bounds. 
If this a virtual election and `agora-results` received 2 elections as input, 
if `tallies_indexes` is `[0,1,2,3]` this pipe will just run for the first two.

#### `sort_non_iterative`: `question_indexes`

- **Property name**: `question_indexes`
- **Type:** `List<Positive Integer> | None`
- **Required:** No
- **Default:** `None`
- **Example:** `[0,1,2]`

List of question indexes to which this pipe should be applied or None if this 
pipe should be run for all the questions of all the elections to which this pipe 
is being run, which is the default. Two notes:
- This is a filtering list. It will not error if any index of this list is out 
of bounds. If there is only a single question but `question_indexes` is set to
`[0,1,2,3,4]`, this pipe will just run for the first question without any error.
- This list of question indexes is applied to all elections. To apply different
`question_indexes` for different elections you would have to include in your 
pipes configuration multiple calls to this pipe with different settings.

#### `sort_non_iterative`: `withdrawals`

- **Property name**: `withdrawals`
- **Type:** `List<AnswerItems>`
- **Required:** No
- **Default:** `None`
- **Example:** 
```json
[
  {
    "answer_id": 0,
    "answer_text": "John Doe for President",
    "question_index": 0
  }
]
```

List of Answers to withdraw. 

Note that other pipes might indicate also answers that need to be withdrawn, 
with the same format as this list, in the 
`data_list[<index>]['withdrawals']`. Both lists are joined for this purpose.

Each `AnswerItem` is an object that requires the following properties:
- `question_index`: The question index.
- `answer_id`: The answer id.
- `answer_text`: The answer text, for sanity checks.

Withdrawed candidates will appear in the election results, but they will never
appear as a winner. 

#### `sort_non_iterative`: `ties_sorting`

- **Property name**: `ties_sorting`
- **Type:** `List<TieAnswerItems>`
- **Required:** No
- **Default:** `[]`
- **Example:** 
```json
[
  {
    "answer_id": 0,
    "answer_text": "John Doe for President",
    "question_index": 0,
    "tie_sort": 0
  },
  {
    "answer_id": 1,
    "answer_text": "Juanito for President",
    "question_index": 0,
    "tie_sort": 1
  }
]
```

When two candidate options are in a tie, you might need to apply an external
procedure to resolve this tie. Once this procedure has been applied, then you
can use this argument to specify how the tie should be resolved.

This argument receives a list of `TieAnswerItems`. 

Each `TieAnswerItems` is an object that requires the following properties:
- `question_index`: The question index.
- `answer_id`: The answer id.
- `answer_text`: The answer text, for sanity checks.
- `tie_sort`: Integer number used for resolving the tie during sorting. If there
is a tie between two candidates, the candidate with the lowest `tie_sort` number
wins.
#### `sort_non_iterative`: `help`

- **Property name**: `help`
- **Type:** `String`
- **Required:** No
- **Default:** `""`
- **Example:** `"Some explanation"`

Most if not all of the pipes receive the `help` argument. This is a way for the
writter of the results configuration pipes to explain anything relating to this
particular pipe + pipe configuration pair, as usually configuration is in JSON
format which does not allow for comments.

### Other pipes

There are many other pipes but we have yet to document them. The easiest way
right now to understand how they work is to just look at the code:

- [agora_results.pipes.duplicate_questions.duplicate_questions](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/duplicate_questions.py#L24)
- [agora_results.pipes.modifications.apply_modifications](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/modifications.py)
- [agora_results.pipes.multipart.make_multipart](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.election_max_size_corrections](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.question_totals_with_corrections](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.reduce_answers_with_corrections](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.multipart_tally_plaintexts_append_joiner](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.data_list_reverse](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.multipart_tally_plaintexts_joiner](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.multipart.append_ballots](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/multipart.py)
- [agora_results.pipes.parity.proportion_rounded](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/parity.py)
- [agora_results.pipes.parity.parity_zip_non_iterative](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/parity.py)
- [agora_results.pipes.parity.reorder_winners](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/parity.py)
- [agora_results.pipes.parity.podemos_parity_loreg_zip_non_iterative](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/parity.py)
- [agora_results.pipes.parity.podemos_parity2_loreg_zip_non_iterative](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/parity.py)
- [agora_results.pipes.podemos.podemos_proportion_rounded_and_duplicates](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/podemos.py)
- [agora_results.pipes.desborda4.podemos_desborda4](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/desborda4.py)
- [agora_results.pipes.desborda3.podemos_desborda3](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/desborda3.py)
- [agora_results.pipes.desborda2.podemos_desborda2](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/desborda2.py)
- [agora_results.pipes.desborda.podemos_desborda](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/desborda.py)
- [agora_results.pipes.pretty_print.pretty_print_stv_winners](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/pretty_print.py)
- [agora_results.pipes.pretty_print.pretty_print_not_iterative](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/pretty_print.py)
- [agora_results.pipes.results.to_files](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/results.py)
- [agora_results.pipes.results.apply_removals](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/results.py)
- [agora_results.pipes.stv_tiebreak.stv_first_round_tiebreak](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/stv_tiebreak.py)
- [agora_results.pipes.pdf.configure_pdf](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/pdf.py)
- [agora_results.pipes.withdraw_candidates.withdraw_candidates](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/withdraw_candidates.py)
- [agora_results.pipes.ballot_boxes.count_tally_sheets](https://github.com/agoravoting/agora-results/blob/master/agora_results/pipes/ballot_boxes.py#L278)
## Census object

This JSON object type describes census configuration related to the election. 
It is used by the [census property](#election-census) and can have the 
following properties:

### Census: `voters`

- **Property name**: `voters`
- **Type:** List<[Voter](#voter-object)>
- **Required:** Yes
- **Default:** -
- **Example:** 
```json
[
  {
    "metadata": {
      "email": "john@example.com",
      "name": "John"
    }
  },
  {
    "metadata": {
      "email": "marta@example.com",
      "name": "Marta"
    }
  }
]
```

It's a list of voters to be imported. Each voter is an object with their 
properties set within the `metadata` field. Which voter properties are valid 
depends on the [authentication method](#census-auth_method) used and the 
[extra fields](#census-extra_fields) defined.

If the census size if big, it's not advisable to import it using this field 
because it's currently not very fast. In that case it's best to use the 
`authapi`'s `bulk_insert_voters` management command through the command line 
which can easily load 4,000 voters/second instead of maybe 6-10 voters/second 
here.

You can also modify the census later when the election is created. If you use
the admin user interface, it will use the same backend as it used during 
election creation here and thus the same speed recommendations apply.

Note that when loading voters using this API, voters are uniquely identified by
a different field depending on the [authentication method](#census-auth_method),
for example the `email` field if using the `email-otp` authentication method.
If you re-upload a census, the voters that already exist (matching their unique 
id) won't be modified. 

However if you use `authapi`'s `bulk_insert_voters` management command, this
kind of detection won't be applied. If you need to update the census, it's best
to first remove all the census with the `bulk_delete_voters` command before 
executing `bulk_insert_voters`.

#### Assigning children elections in parent election census

If the election is a parent election, you usually set the census within the
parent election and there assign to which children elections can that specific
voter vote. To do so, set the `children_event_id_list` property within the 
`metadata` field of each voter. This list is simply a list of children election
ids in which the voter can vote. If we had a parent election with id `100` and
two children elections with ids `101` and `102`, we could assign one voter to
each children election with this example:

```json
[
  {
    "metadata": {
      "email": "john@example.com",
      "name": "John",
      "children_event_id_list": [101]
    }
  },
  {
    "metadata": {
      "email": "marta@example.com",
      "name": "Marta",
      "children_event_id_list": [102]
    }
  }
]
```

### Census: `auth_method`

- **Property name**: `auth_method`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `sms-otp`

This property specifies which is the main authentication method related to the
election. The list of currently available authentication methods is:

- **email**: The user will be authenticate through a code sent via email.
The email is sent by the adminstrators to voters using the `Send authentication` 
option in the Election Dashboard or the `Send auth codes` to specific voters
option in the election `Census Data` sidebar option. If used, an 
[extra_field](#census-extra_fields) of type `email` and named `email` is 
required.

- **email-otp**: The user will authenticate through an OTP (One Time Password)
sent via email. This OTP is not sent to voters by administrators, but instead 
is requested by voters during the authentication process each time they execute
it. If used, an [extra_field](#census-extra_fields) of type `email` and named 
`email` is  required.

- **email-and-password**: The voters will authenticate simply by the email 
and password. You can assign the `password` field of each voter appropiately.
If used, an [extra_field](#census-extra_fields) of type `password` and named 
`password` is required.

- **sms**: The user will be authenticate through a code sent via SMS.
The SMS is sent by the adminstrators to voters using the `Send authentication` 
option in the Election Dashboard or the `Send auth codes` to specific voters
option in the election `Census Data` sidebar option. If used, an 
[extra_field](#census-extra_fields) of type `tlf` and named `tlf` is 
required.

- **sms-otp**: The user will authenticate through an OTP (One Time Password) 
sent via SMS. This OTP is not sent to voters by administrators, but instead is 
requested by voters during the authentication process each time they execute it.
If used, an [extra_field](#census-extra_fields) of type `tlf` and named 
`tlf` is required.

- **openid-connect**: The authentication will happen through a third-party 
openid provider. This provider shall be configured in the `config.yml` 
[ansible deployment configuration](../deployment/guide.md). If used, an 
[extra_field](#census-extra_fields) of type `sub` and named `text` is 
required.

- **user-and-password**: The voters will authenticate simply by the username 
and password. You can assign the `password` field of each voter appropiately. 
This is usually not recommended, as by default voters are assigned a random
username so it's difficult for them to know their username. The only usecase for
this is currently for the administrative `AuthEvent` (usually with id `0`) used
to authenticate in the administrative interface, and whose list of users is 
directly set within the `config.yml` 
[ansible deployment configuration](../deployment/guide.md) using the 
`config.authapi.upsert_file` and the superadmin user 
(`config.authapi.admin_user`). If used, an [extra_field](#census-extra_fields) 
of type `password` and named `password` is required.

- **smart-link**: The voters will authenticate using a smart link that includes
a secure authentication token using a keyed
[HMAC](https://en.wikipedia.org/wiki/HMAC). It's a straightforward way to
implement Single sign-on (SSO) and integrate with a third-party site or 
plataform. Read about how to use it in the
[Smart Link Authentication Guide](../integrations/smart-link-auth).

- **dnie**: The voters will authenticate using a TLS client authentication
certificate. This authentication method requires some updates to be usable in 
the current version of the software and thus is currently not usable, but it 
does not require much development work to make it work.

<!-- TODO: Write a guide explaining how to add a new authentication method. -->

:::note Alternative authentication methods
If the authentication method is `email` but there's defined also an `tlf` 
[extra field](#census-extra_fields), then for those elements in census where
both fields are defined, the voter will receive the Authentication Code through
both SMS and email authentication, and the voter will be able to authenticate
through the link and code sent by either of those.
:::
### Census: `census`

- **Property name**: `census`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `"close"`

Indicates if the census is either `"open"` or `"close"`. If census is `"open"`, 
it means it is in open registration mode and voters can register themselves, 
fill the [extra_fields](#census-extra_fields) required on registration to be 
able to vote later either at that moment if the election is open or later on.

### Census: `extra_fields`

- **Property name**: `extra_fields`
- **Type:** List<[Extra Field](#extra-field-object)>
- **Required:** Yes
- **Default:** -
- **Example:** 
```json
[
  {
    "name": "email",
    "type": "email",
    "required": true,
    "min": 2,
    "max": 200,
    "required_on_authentication": true
  }
]
```

Defines authentication fields that the voters might fill or with some relation 
to voters. There are some `extra_fields` required depending on the election's 
[auth_method](#election-auth_method). For example, if the authentication method
is `sms-otp`, the extra field named `tlf` and of type `tlf` is required. 

See [Extra Field](#extra-field-object) for more details about extra fields. 

### Census: `admin_fields`

- **Property name**: `admin_fields`
- **Type:** List<[Admin Field](#admin-field-object)>
- **Required:** Yes
- **Default:** -
- **Example:**
```json
[
  {
    "name": "org_legal_name",
    "label": "Organization: Legal Name",
    "description": "Required. Please provide the name under which your organization is legally registered. It will be shown as part of the public information in a section inside the election public page.",
    "placeholder": "Example: Association of Surgeons of Great Britain",
    "min": 1,
    "max": 255,
    "value": "Example Organization Name",
    "required": true,
    "private": true,
    "type": "text"
  },
  {
    "name": "org_url",
    "label": "Organization: Website URL",
    "description": "Optional. Please provide the URL of your organization. It will be shown as part of the public information in a section inside the election public page.",
    "placeholder": "Example: https://example.com",
    "min": 5,
    "value": "https://example.com",
    "required": false,
    "private": true,
    "type": "text"
  }
]
```

Object that details the different options related to the election and required
to be filled by election administrators for every election. What admin fields 
need to be filled is configured in the `config.yml` 
[ansible deployment configuration](../deployment/guide.md) with the key 
`config.agora_gui.admin_fields`. 

See [Admin Field](#admin-field-object) for more details.

### Census: `auth_method_config`

- **Property name**: `auth_method_config`
- **Type:** List<[Auth Method Config](#auth-method-config-object)>
- **Required:** Yes
- **Default:** -
- **Example:**
```json
{
  "allow_user_resend": true,
  "msg": "Vote in __URL__ with code __CODE__",
  "subject": "Vote now with nVotes",
  "authentication-action": {
    "mode": "vote",
    "mode-config": {
      "url": ""
    }
  },
  "registration-action": {
    "mode": "vote",
    "mode-config": null
  }
}
```

Object that specifies various configuration authentication and authorization
options.

See [Census Config](#census-config-object) for more details.

## Extra Field Object

Defines an authentication field that the voters might fill or with some relation 
to voters. Some extra fields are required depending on the election's 
[auth_method](#election-auth_method). For example, if the authentication method
is `sms-otp`, the extra field named `tlf` and of type `tlf` is required. 

It is used by the Census' [extra_fields property](#census-extra_fields) and can 
have the following properties:

### Extra Field: `name`

- **Property name**: `name`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `"email"`

The name property identifies the extra field. For most 
[extra field types](#extra-field-type) the name set here is shown to voters
as the field name in the user interface during the authentication process. It's
also used in API calls as the key to receive the authentication data or to store
the census data of a specific user.

### Extra Field: `type`

- **Property name**: `type`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `"text"`

Defines the extra field type, which changes in appeareance and behaviour. There
are the following available extra field types that you can use:
- `"text"`
- `"int"`
- `"bool"`
- `"email"`
- `"tlf"`
- `"captcha"`
- `"textarea"`
- `"dni"`
- `"dict"`
- `"date"`

### Extra Field: `required_on_authentication`

- **Property name**: `required_on_authentication`
- **Type:** `Boolean`
- **Required:** Yes
- **Default:** -
- **Example:** `false`

Defines if this field is required during authentication. If `true` it means 
that during the authentication process this field needs to be provided by the 
voter.  

### Extra Field: `required`

- **Property name**: `required`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `false`

Defines if this field is always required. If `true` it means that during any 
process in which the voter needs to fill the extra fields, either during
registration or authentication, this field needs to be provided by the voter. 

### Extra Field: `required_when_registered`

- **Property name**: `required_when_registered`
- **Type:** `Boolean`
- **Required:** No
- **Default:** -
- **Example:** `false`

If set to `true` this extra field will not appear to voters during 
[open registration](#census-census). A better name for it might have been 
`hidden_during_registration`.

### Extra Field: `private`

- **Property name**: `private`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Defines if this field is private. If set to `true`, then the field will not 
appear to voters at any time but it will be appear in the census. This is useful
if there's any field that you want to appear in the census to be able to search
for it or review that kind of user data in the administrative interface, but 
should not be used for anything else.

### Extra Field: `unique`

- **Property name**: `unique`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set to `true` (the default is `false`), vote registration will fail if the
voter enters a value to this field that is repeated by any other element in the
census. Note that this field uniquness is not verified during census import by
administrators. It only makes sense to set `unique` to `true` when setting the
election to have `open` [voter registration](#census-census), because otherwise
it will have no effect as there won't be any open voter registration process.

### Extra Field: `match_census_on_registration`

- **Property name**: `match_census_on_registration`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

For `open` [voter registration](#census-census), any previous element in the 
census would be matched using this field. This useful to be used together with 
[fill_if_empty_on_registration](#extra-field-fill_if_empty_on_registration), 
so that if you have a pre-registration census with only some fields already 
filled in, you could fill the missing fields with 
`fill_if_empty_on_registration` if  you first identify the element in census 
with `match_census_on_registration` set to `true`.

### Extra Field: `fill_if_empty_on_registration`

- **Property name**: `fill_if_empty_on_registration`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

It is used for pre-registration. If the pre-registered user on the census has 
this field empty, then when the user will be able to set its value upon 
registration.

This useful to be used together with 
[match_census_on_registration](#extra-field-match_census_on_registration), so 
that if you have a pre-registration census with only some fields already filled
in, you could fill the missing fields with `fill_if_empty_on_registration` if 
you first identify the element in census with `match_census_on_registration` 
set to `true`.

### Extra Field: `userid_field`

- **Property name**: `userid_field`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

`userid_field` is used to generate the username, usedto generate the hmac 
authentication token. If any field on the authevent is marked with 
`userid_field` as `true`, the username won't be generated randomly as it is done 
usually, but instead it will be generated by:

1. Concatenating all the data from the `userid_field`'s (in order of
appeareance of the fields in ae.extra_fields).
2. Adding the shared_secret (`field1:field2:field3...:shared_secret`)
separated with the colon character: `:`.
3. The username will be the sha256 hash of the above
Note that if a field is marked as userid_field, it should always have a valid 
convertable-to-string value.

### Extra Field: `help`

- **Property name**: `help`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"Example: John Doe"`

Help text that will appear below the input in the voter authentication or 
registration form.

### Extra Field: `regex`

- **Property name**: `regex`
- **Type:** `String`
- **Required:** No
- **Default:** -
- **Example:** `"/\d{9}[a-z]/"`

Regular expression that will be checked against user input when sending the
authentication or registration form. This property only makes sense for extra
fields whose input is a string like `textarea`, `email` or `text`.

### Extra Field: `min`

- **Property name**: `min`
- **Type:** `Integer`
- **Required:** No
- **Default:** -
- **Example:** `1`

This property can mean two different things:
- For extra fields whose value is a string, it's the minimum allowed length of 
such a string.
- For extra fields of `int` [type](#extra-field-type), it is the minimum 
allowed value.

### Extra Field: `max`

- **Property name**: `max`
- **Type:** `Integer`
- **Required:** No
- **Default:** -
- **Example:** `55`

This property can mean two different things:
- For extra fields whose value is a string, it's the maximum allowed length of 
such a string.
- For extra fields of `int` [type](#extra-field-type), it is the maximum 
allowed value.

### Extra Field: `autofill`

- **Property name**: `autofill`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

When user is is activated by calling to `authapi`'s 
`/api/auth-event/%d/census/activate/`, this field will be copied from the admin
user to the activated user. This is useful for example if an admin user has an
extra field specifying the precint assigned to it and we would like to set that
info in a [private field](#extra-field-private) of the activated user too.

<!--
TODO: extra fields properties:
register-pipeline
authenticate-pipeline
-->

## Admin Field Object

Object that details the different options related to the election and required
to be filled by election administrators for every election. What admin fields 
need to be filled is configured in the `config.yml` 
[ansible deployment configuration](../deployment/guide.md) with the key 
`config.agora_gui.admin_fields`. 

It is used by the Census' [admin_fields property](#census-admin_fields) and
set by the election administrator during creator in the sidebar item 
`Admin Fields`.

The properties of an [Admin Field](#admin-field-object) are the same as those
of an [Extra Field](#extra-field-object) but with some additional properties:
- `description`: Description of what the field should be used for
- `label`: Label of the admin field, which will be shown to the election creator
 instead of the name.
- `value`: Value set for this specific election.
- `placeholder`: placeholder to be shown for the admin field when empty.

## Census Config Object

This JSON object type describes some census configuration parameters 
related to the election. It is used by the [config property](#census-config) of
the [census object](#census-object) and can have the following properties:

### Census Config: `allow_user_resend`

- **Property name**: `allow_user_resend`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set to true, allows the voter to request the authentication code to be 
resent. This makes sense only for authentication methods that use authentication
codes such as `email`, `email-otp`, `sms` or `sms-otp`, but not for others such
as `email-and-password`, `user-and-password` or `openid-connect`.

### Census Config: `msg`

- **Property name**: `msg`
- **Type:** `String`
- **Required:** In applicable authentication methods
- **Default:** -
- **Example:** `"Vote in __URL__ with code __CODE__"`

This is the text body template used for sending the authentication codes to 
voters. It's only applicable to authentication methods that send authentication
codes to voters such as `email`, `email-otp`, `sms` or `sms-otp`. In the first
two this corresponds to the Plain Text body of the email message.

As mentioned earlier, this is a template. Each voter will received a taylored
message with the template variables substituted with their values. Variables
are identified surrounded by two `_` characters and always in upper case. 
For example the variable `url` would appear as `__URL__`.

The allowed template variables are:
- `__URL__`: This is the voter authentication URL specific for the voter but
not containing the voter authentication code, which the voter will have to fill
out manually.
- `__URL2__`: This is the voter authentication URL containing the 
both the email/sms of the voter and the voter authentication code. If no other
[extra_field](#census-extra_fields) is required during authentication, entering  
in the `__URL2__` URLs allows voters to authenticate without having to fill out 
any web form. It's easier, but also more risky because anyone with this link 
could use it to authenticate.
- `__CODE__`: This is the authentication code. Each time the authentication 
codes are sent to a voter, a new code is generated and any old codes are 
disabled.
- `__<extra_field>__`: Each voter has some voter related information 
associated to it. You can use those extra fields by the 
[sluggified](https://docs.djangoproject.com/en/3.1/ref/utils/#django.utils.text.slugify) 
and uppercased [name](#extra-field-name) property.

The maximum length of the message text depends on the authentication method. By
default the email text body can have up to `5,000` characters, and SMS text
body can only have `200`. To change this, you would need to change the code
in the respective authentication method code. 
[This is the relevant code](https://github.com/agoravoting/authapi/blob/master/authapi/authmethods/m_email.py#L94) 
in the `email` authentication method:

```python title="authapi/authmethods/m_email.py" {20}
    CONFIG_CONTRACT = [
      {
        'check': 'isinstance',
        'type': dict
      },
      {
        'check': 'dict-keys-exist',
        'keys': ['msg', 'subject', 'registration-action', 'authentication-action']
      },
      {
        'check': 'index-check-list',
        'index': 'msg',
        'check-list': [
          {
            'check': 'isinstance',
            'type': str
          },
          {
            'check': 'length',
            'range': [1, 5000]
          }
        ]
      },
```

### Census Config: `subject`

- **Property name**: `subject`
- **Type:** `String`
- **Required:** In applicable authentication methods
- **Default:** -
- **Example:** `"Vote now with nVotes"`

This is the email subject template used for sending the authentication codes to 
voters. It's only applicable to authentication methods that send authentication
codes to voters such as `email` and `email-otp`.

The template works in the same manner as the 
[`msg` property](#census-config-subject), see that one for more details.

### Census Config: `authentication-action`

- **Property name**: `authentication-action`
- **Type:** `Object`
- **Required:** Yes
- **Default:** -
- **Example:**
```json
{
  "mode": "vote",
  "mode-config": {
    "url": ""
  }
}
```

## Question Object

This JSON object type describes a question (or [contest](https://pages.nist.gov/ElectionGlossary/#contest) in NIST terminology) in which a voter can vote. It is used inside the [Election: `questions`](#election-questions) property of
the [Election object](#election-object) and can have the following properties:

### Question: `title`

- **Property name**: `title`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Example:** `"Do you approve the Annual Accounts of 2021?"`

Title of the question. Will be shown in the voting booth and in the election 
results.

### Question: `description`

- **Property name**: `description`
- **Type:** `Long String`
- **Required:** Yes
- **Default:** -
- **Example:** 

```
"This is the description of the question. You can add simple html like <strong>bold</strong> or <a href=\"https://nvotes.com\">links to websites</a>.\n\n<br><br>You need to use two br element for new paragraphs."
```

Question description. It will appear below the title in the voting booth. 
As shown in the example it allows for some basic HTML.

### Question: `layout`

- **Property name**: `layout`
- **Type:** `String`
- **Required:** Yes
- **Default:** -
- **Allowed values:**:
  - `"accordion"`
  - `"simultaneous-questions"`
  - `"pcandidates-election"`
  - `"conditional-accordion"`
- **Example:** `"simultaneous-questions"`

Indicates the layout to be applied in the voting booth for this question. 
Different layouts imply different presentation of the question. Note that not
all the features are available for all the layouts. The layout that supports
more features and has been most used is the `"accordion"` layout.

### Question: `max`

- **Property name**: `max`
- **Type:** `Positive Integer`
- **Required:** Yes
- **Default:** -
- **Example:** `1`

Maximum number of answers that a voter can choose in the voting booth to 
consider the vote valid. It must be greater or equal to 
[Question: `min`](#question-min) and be greater than zero.

### Question: `min`

- **Property name**: `min`
- **Type:** `Positive Integer`
- **Required:** Yes
- **Default:** -
- **Example:** `2`

Minimum number of answers that a voter can choose in the voting booth to 
consider the vote valid. It must be less or equal to 
[Question: `max`](#question-max) and be greater or equal to zero.

### Question: `num_winners`

- **Property name**: `num_winners`
- **Type:** `Positive Integer`
- **Required:** Yes
- **Default:** -
- **Example:** `3`

Number of winner answers to appoint in the electoral results.

### Question: `tally_type`

- **Property name**: `tally_type`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Allowed values:**:
  - `"plurality-at-large"`
  - `"cumulative"`
  - `"borda"`
  - `"borda-custom"`
  - `"borda-nauru"`
  - `"desborda"`
  - `"desborda2"`
  - `"desborda3"`
- **Example:** `"borda"`

Indicates the name of the algorithm to apply to count the votes and calculate
the results of this question.

### Question: `answer_total_votes_percentage`

- **Property name**: `answer_total_votes_percentage`
- **Type:** `Short String`
- **Required:** Yes
- **Default:** -
- **Allowed values:**:
  - `"over-total-valid-votes"`
  - `"over-total-votes"`
- **Example:** `"over-total-votes"`

Indicates if the percentages of votes shown in the election results should be
calculated over votes to options or over all votes.

### Question: `answers`

- **Property name**: `answers`
- **Type:** List<[Answer](#answer-object)>
- **Required:** Yes
- **Default:** -
- **Example:** 
```json
[
  {
    "category": "Liste 1: Die Linken",
    "details": "",
    "id": 0,
    "sort_order": 0,
    "text": "Liste 1: Die Linken",
    "urls": [
      {
        "title": "URL",
        "url": ""
      },
      {
        "title": "Image URL",
        "url": ""
      },
      {
        "title": "isCategoryList",
        "url": "true"
      }
    ]
  },
  {
    "category": "Liste 1: Die Linken",
    "details": "",
    "id": 1,
    "sort_order": 1,
    "text": "Schulze, Alexander",
    "urls": [
      {
        "title": "URL",
        "url": ""
      },
      {
        "title": "Image URL",
        "url": ""
      }
    ]
  }
]
```

List of candidate [answers](#answer-object) in the question.

### Question: `extra_options`

- **Property name**: `extra_options`
- **Type:** [Question Extra](#question-extra-object)
- **Required:** No
- **Default:** `{}`
- **Example:**  `{}`

Set of [extra options](#question-extra-object) to configure this question.

## Question Extra Object

An object describing a set of additional of question configuration options, 
currently used to modify the voting booth presentation behaviour. It is used 
[here](#question-extra_options) and it can have the following 
properties:

TODO: there are many more options, not yet documented here.

### Question Extra: `invalid_vote_policy`

- **Property name**: `invalid_vote_policy`
- **Type:** `Short String`
- **Required:** No
- **Allowed values:**
  - `"allowed"`
  - `"warn"`
  - `"not-allowed"`
- **Default:** `"warn"`
- **Example:** `"allowed"`

Indicates whether an invalid vote should be allowed without warning, allowed
but warning the voter, or not allowed.

### Question Extra: `enable_panachage`

- **Property name**: `enable_panachage`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `true`
- **Example:** `false`

If set to `true` (the default), the voter will be able to choose answers from
multiple categories. If set to `false`, the voter will only be allowed to choose
answers from a single category and any vote doing otherwise will be deemed 
invalid.

### Question Extra: `cumulative_number_of_checkboxes`

- **Property name**: `cumulative_number_of_checkboxes`
- **Type:** `Integer`
- **Required:** No
- **Default:** `1`
- **Example:** `3`

Specifies the number of checkboxes shown to the side of each question's answer,
so that the voter can check each of them. Currently only used when voting method
is  `cummulative`. By default, if unset, its value is `1`. 

### Question Extra: `enable_checkable_lists`

- **Property name**: `enable_checkable_lists`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

If set to `true` then an answer representing the checkable category can be 
added, and can be flagged as such by setting an url to the answer with title 
`type` and value `checkable-list` (string).

### Question Extra: `show_points`

- **Property name**: `show_points`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Indicates whether to show the points for each candidate and default to `false`.
If set to `true`, then the review screen where the voter can review the ballot
choices before casting the vote will show the points assigned to each selected
candidate next to the selected candidate in questions where the tally mechanism
allows us to do so. 

The `accordion` question layout will also show the points assigned to each 
candidate if this setting is set to `true`.

### Question Extra: `review_screen__show_question_description`

- **Property name**: `review_screen__show_question_description`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Indicate whether the question description should be shown in the review screen
of the voting booth below the election title for this specific question. 
Defaults to `false`.

### Question Extra: `allow_writeins`

- **Property name**: `allow_writeins`
- **Type:** `Boolean`
- **Required:** No
- **Default:** `false`
- **Example:** `true`

Indicate whether this question can include any write-ins. Needed to set to
`true` if you are using [write-ins](/docs/advanced-elections/write-ins) in the 
question. Defaults to `false`.

### Question Extra: `answer_group_columns_size`

- **Property name**: `answer_group_columns_size`
- **Type:** `Integer`
- **Required:** No
- **Allowed values:** `3, 4, 6, 12`
- **Default:** `6`
- **Example:** `12`
- **Related:**
  - [`answer_columns_size`](#question-extra-answer_columns_size)

Specifies the relative width of each answer category in the `simulaneous-questions`
layout in the voting booth.

It uses [bootstrap 12 columns system](https://getbootstrap.com/docs/3.3/css/#grid-options),
meaning the sizes need to be an integer from the allowed values (`3, 4, 6, 12`).

For example, if it's set to `12`, it means that each category will use the full
width. But if it's set to `6`, then two categories will appear next to the other. 
Note that we are using `col-md-<number>`, so in small devices each category will
neverless use the full width, equivalent to using the value `12`.

All answers with no category set (category empty) are considered to be in the 
same category with respect to this setting.

### Question Extra: `answer_columns_size`

- **Property name**: `answer_columns_size`
- **Type:** `Integer`
- **Required:** No
- **Allowed values:** `3, 4, 6, 12`
- **Default:** `12`
- **Example:** `4`
- **Related:**
  - [`answer_group_columns_size`](#question-extra-answer_group_columns_size)

Specifies the relative width of each answer within each answer category in the 
`simulaneous-questions` layout in the voting booth. 

It uses [bootstrap 12 columns system](https://getbootstrap.com/docs/3.3/css/#grid-options),
meaning the sizes need to be an integer  from the allowed values (`3, 4, 6, 12`).

For example, if the `answer_group_columns_size` is set to `12` and the 
`answer_columns_size` is set to `6`, then each category will use the full width
and each answer will only use 50%, showing themselves in pairs.

However if `answer_group_columns_size` is set to `6` and the 
`answer_columns_size` is set to `12`, then it would be answer categories using 
half of the screen, appearing side by side in pairs. And within each category, 
each answer will use the full width of the category.

## Children Election Info Object

TODO 

## Answer Object

TODO 