/*!
 * Form services/utilities (Vue)
 * File: forms.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

const schemaData = {
  "status": [
    {value: 'draft', text: 'Draft'},
    {value: 'submitted', text: 'Submitted'}
  ],
  "roles": [
    {value: 'inactive', text: 'Inactive'},
    {value: 'nominator', text: 'Nominator'},
    {value: 'registrar', text: 'Registrar'},
    {value: 'administrator', text: 'Administrator'},
    {value: 'super-administrator', text: 'Super-Administrator'}
  ],
  "categories": [
    {
      value: 'emerging-leader',
      type:'individual',
      text: 'Emerging Leader',
      sections:[
        'summary',
        'context',
        'valuing_people',
        'commitment',
        'impact',
      ]},
    {
      value: 'evidence-based-design',
      type:'organization',
      text: 'Evidence-Based Design',
      sections:[
        'summary',
        'context',
        'complexity',
        'approach',
        'impact',
      ]},
    {
      value: 'innovation',
      type: 'organization',
      text: 'Innovation',
      sections:[
        'summary',
        'context',
        'complexity',
        'approach',
        'impact',
      ]},
    {
      value: 'leadership',
      type: 'individual',
      text: 'Leadership',
      sections:[
        'summary',
        'context',
        'valuing_people',
        'commitment',
        'impact',
      ]},
    {
      value: 'legacy',
      type: 'individual',
      text: 'Legacy',
      sections:[
        'summary',
        'context',
        'complexity',
        'valuing_people',
        'contribution',
        'impact',
      ]},
    {
      value: 'organizational-excellence',
      type: 'organization',
      text: 'Organizational Excellence',
      sections:[
        'summary',
        'context',
        'complexity',
        'approach',
        'impact',
      ]},
    {
      value: 'partnership',
      type: 'organization',
      text: 'Partnership',
      sections:[
        'summary',
        'context',
        'complexity',
        'approach',
        'impact',
      ]},
    {
      value: 'regional-impact',
      type: 'organization',
      text: 'Regional Impact',
      sections:[
        'summary',
        'context',
        'complexity',
        'approach',
        'impact',
      ]},
  ],
  "evaluationSections": [
    {value: 'summary', text: 'Summary'},
    {value: 'context', text: 'Context'},
    {value: 'complexity', text: 'Complexity'},
    {value: 'approach', text: 'Approach'},
    {value: 'valuing_people', text: 'Valuing People'},
    {value: 'commitment', text: 'Commitment to the Organization'},
    {value: 'contribution', text: 'Contribution to BC Public Service Excellence'},
    {value: 'impact', text: 'Impact'}
  ],
  "organizations": [
    {value: null, text: 'Please select an eligible Ministry or organization'},
    {value: 'org-1', text: 'Advanced Education and Skills Training'},
    {value: 'org-2', text: 'Agriculture, Food and Fisheries'},
    {value: 'org-3', text: 'Attorney General & Housing'},
    {value: 'org-4', text: 'Children and Family Development'},
    {value: 'org-5', text: 'Citizens’ Services'},
    {value: 'org-6', text: 'Education'},
    {value: 'org-7', text: 'Emergency Management BC'},
    {value: 'org-8', text: 'Energy, Mines and Low Carbon Innovation'},
    {value: 'org-9', text: 'Environment and Climate Change Strategy'},
    {value: 'org-10', text: 'Environment Assessment Office'},
    {value: 'org-11', text: 'Finance'},
    {value: 'org-12', text: 'Forests, Lands, Natural Resource Operations and Rural Development'},
    {value: 'org-13', text: 'Health'},
    {value: 'org-14', text: 'Indigenous Relations and Reconciliation'},
    {value: 'org-15', text: 'Jobs, Economic Recovery and Innovation'},
    {value: 'org-16', text: 'Labour'},
    {value: 'org-17', text: 'Mental Health & Addictions'},
    {value: 'org-18', text: 'Municipal Affairs'},
    {value: 'org-19', text: 'Public Safety & Solicitor General'},
    {value: 'org-20', text: 'Social Development & Poverty Reduction'},
    {value: 'org-21', text: 'Tourism, Arts, Culture and Sport'},
    {value: 'org-22', text: 'Transportation & Infrastructure'},
    {value: 'org-23', text: 'BC Public Service Agency'},
    {value: 'org-24', text: 'Government Communications and Public Engagement'},
    {value: 'org-25', text: 'Office of the Premier'}
  ],
  "mimeTypes": [
    {value: null, text: 'Please select a mime type'},
    {value: 'application/pdf', text: 'PDF'},
    {value: 'application/doc', text: 'MS Word'},
  ]
};

export default {

  /**
   * get enumerated data by key
   * **/

  get: function get(key) {
    return schemaData[key] !== 'undefined' ? schemaData[key] : null;
  },

  /**
   * get enumerated data by key
   * **/

  lookup: function lookup(key, value) {
    if (typeof schemaData[key] === 'undefined') return null;
    const found = schemaData[key].filter(item => item.value === value);
    return found.length > 0 ? found[0].text : null;
  },

  /**
   * lookup nomination form type
   * **/

  lookupType: function lookupType(category) {
    const found = schemaData.categories.filter(item => item.value === category);
    return found.length > 0 ? found[0].type : null;
  },

  /**
   * check if category contains given section
   * **/

  checkSection: function checkSection(section, category) {
    return schemaData['categories'].filter(cat => {
      return cat.value === category && cat.sections.includes(section);
    }).length > 0;
  }

}
