import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "home",
    title: "MENU.HOME",
    type: "item",
    icon: "home",
    url: "home",
  },
  {
    id: "cvtech",
    title: "MENU.cvtech",
    type: "collapsible",
    icon: "menu",

    children: [
      {
        id: "campaign",
        title: "MENU.CVTECH.APP",
        type: "collapsible",
        icon: "folder-plus",
        children: [
          {
            id: "allcampaigns",
            title: "MENU.CVTECH.ALLCAMPAIGNS",
            type: "item",
            icon: "list",
            url: "cvtech/campaign/allcampaigns",
          },
          {
            id: 'function',
            title: 'MENU.Function',
            type: 'item',
            icon: 'monitor',
            url: 'cvtech/campaign/function',
          },
          {
            id: 'contract',
            title: 'MENU.Contract',
            type: 'item',
            icon: 'monitor',
            url: 'cvtech/campaign/contract',
          },
          {
            id: 'region',
            title: 'MENU.Region',
            type: 'item',
            icon: 'monitor',
            url: 'cvtech/campaign/region',
          },
          {
            id: "addcampaign",
            title: "MENU.CVTECH.ADDCAMPAIGN",
            type: "item",
            icon: "plus-square",
            url: "cvtech/campaign/addcampaign",
          }
        ],
      },
      {
        id: "candidats",
        title: "MENU.CVTECH.CANDIDAT",
        type: "collapsible",
        icon: "users",
        children: [
          {
            id: "allcandidats",
            title: "MENU.CVTECH.ALLCANDIDATS",
            type: "item",
            icon: "list",
            url: "cvtech/candidates/allcandidates",
          },
          {
            id: "addcandidat",
            title: "MENU.CVTECH.ADDCANDIDAT",
            type: "item",
            icon: "plus-square",
            url: "cvtech/candidates/addcandidate",
          },
        ],
      },
      {
        id: "Cvs",
        title: "cvs",
        type: "collapsible",
        icon: "book",
        children: [
          {
            id: "edu",
            title: "Education",
            type: "item",
            icon: "file",
            url: "cvtech/cvs/education",
          },
          {
            id: "ge",
            title: "Global Exprience",
            type: "item",
            icon: "file",
            url: "cvtech/cvs/experience",
          },
          {
            id: "skill",
            title: "Skills",
            type: "item",
            icon: "file",
            url: "cvtech/cvs/skills",
          },
        ],
      },
    ],
  },
  {
    id: "companies",
    type: "collapsible",
    title: "MENU.COMPANY.APP",
    icon: "menu",

    children: [
      {
        id: "company",
        title: "MENU.COMPANY.COMP",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allcompanies",
            title: "MENU.COMPANY.ALLCOMPANIES",
            type: "item",
            icon: "list",
            url: "companies/company/allcompanies",
          },
          {
            id: "addcompany",
            title: "MENU.COMPANY.ADDCOMPANY",
            type: "item",
            icon: "plus-square",
            url: "companies/company/addcompany",
          },
        ],
      },
      {
        id: "Companyentity",
        title: "MENU.COMPANY.COMPANYENTITY",
        type: "collapsible",
        icon: "grid",
        children: [
          {
            id: "Companyentity",
            title: "MENU.COMPANY.ALLENTITIES",
            type: "item",
            icon: "list",
            url: "companies/company-entity/allentities",
          },
          {
            id: "Companyentity",
            title: "MENU.COMPANY.ADDCOMPANYENTITY",
            type: "item",
            icon: "plus-square",
            url: "companies/company-entity/addcompanyentity",
          },
        ],
      },
      {
        id: "Department",
        title: "MENU.COMPANY.DEPARTMENT",
        type: "item",
        icon: "grid",
        url: "companies/department/department",
      },
      {
        id: "Team",
        title: "MENU.COMPANY.TEAM",
        type: "collapsible",
        icon: "grid",
        children: [
          {
            id: "allteams",
            title: "MENU.COMPANY.ALLTEAMS",
            type: "item",
            icon: "plus-square",
            url: "companies/team/allteams",
          },
        ],
      },
      {
        id: "Project",
        title: "MENU.COMPANY.PROJECT",
        type: "collapsible",
        icon: "grid",
        children: [
          {
            id: "allprojects",
            title: "MENU.COMPANY.ALLPROJECTS",
            type: "item",
            icon: "plus-square",
            url: "companies/project/allprojects",
          },
        ],
      },
      {
        id: "Employee",
        title: "MENU.COMPANY.EMPLOYEE",
        type: "collapsible",
        icon: "grid",
        children: [
          {
            id: "addemployee",
            title: "MENU.COMPANY.ADDEMPLOYEE",
            type: "item",
            icon: "plus-square",
            url: "companies/employee/addemployee",
          },
          {
            id: "allemployees",
            title: "MENU.COMPANY.ALLEMPLOYEES",
            type: "item",
            icon: "list",
            url: "companies/employee/allemployees",
          },
        ],
      },
      {
        id: "Job",
        title: "MENU.COMPANY.JOB",
        type: "collapsible",
        icon: "grid",
        children: [
          {
            id: "alljobs",
            title: "MENU.COMPANY.ALLJOBS",
            type: "item",
            icon: "plus-square",
            url: "companies/job/alljobs",
          },
        ],
      },
    ],
  },
  {
    id: "leads",
    type: "collapsible",
    title: "MENU.LEAD.APP",
    icon: "menu",
    children: [
      {
        id: "commercial",
        title: "MENU.LEAD.COMMERCIAL",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allCommercials",
            title: "MENU.LEAD.ALLCOMMERCIAL",
            type: "item",
            icon: "list",
            url: "crm/commercial",
          },
        ],
      },

      {
        id: "project",
        title: "MENU.LEAD.PROJECT",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allprojects",
            title: "MENU.LEAD.ALLPROJECTS",
            type: "item",
            icon: "list",
            url: "crm/project",
          },
        ],
      },
      {
        id: "product",
        title: "MENU.LEAD.PRODUCT",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allproducts",
            title: "MENU.LEAD.ALLPRODUCTS",
            type: "item",
            icon: "list",
            url: "crm/product",
          },
        ],
      },
      {
        id: "service",
        title: "MENU.LEAD.SERVICE",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allservices",
            title: "MENU.LEAD.ALLSERVICES",
            type: "item",
            icon: "list",
            url: "crm/service",
          },
        ],
      },
      {
        id: "serviceType",
        title: "MENU.LEAD.SERVICETYPE",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allServiceTypes",
            title: "MENU.LEAD.ALLSERVICETYPES",
            type: "item",
            icon: "list",
            url: "crm/serviceType",
          },
        ],
      },
    ],
  },
  {
    id: "GRH",
    type: "collapsible",
    title: "MENU.GRH.APP",
    icon: "menu",
    children: [
      {
        id: "visit",
        title: "MENU.GRH.VISIT",
        type: "item",
        icon: "plus-square",
        url: "grh/visit",
      },
      {
        id: "warningType",
        title: "MENU.GRH.WARNINGTYPE",
        type: "item",
        icon: "plus-square",
        url: "grh/warningType",
      },
      {
        id: "warning",
        title: "MENU.GRH.WARNING",
        type: "item",
        icon: "plus-square",
        url: "grh/warning",
      },

      {
        id: "requests",
        title: "MENU.GRH.REQUESTS",
        type: "collapsible",
        icon: "grid",

        children: [
          {
            id: "allholidayrequests",
            title: "MENU.GRH.ALLHOLIDAYREQUESTS",
            type: "item",
            icon: "list",
            url: "grh/requests/all-holiday-requests",
          },
          {
            id: "allabsencerequests",
            title: "MENU.GRH.ALLABSENCEREQUESTS",
            type: "item",
            icon: "list",
            url: "grh/requests/all-absence-requests",
          },
          {
            id: "alldeparturerequests",
            title: "MENU.GRH.ALLDEPARTUREREQUESTS",
            type: "item",
            icon: "list",
            url: "grh/requests/all-departure-requests",
          },
          {
            id: "allmaterialrequests",
            title: "MENU.GRH.ALLMATERIALREQUESTS",
            type: "item",
            icon: "list",
            url: "grh/requests/all-material-requests",
          },
        ],
      },
      {
        id: "allemployees",
        title: "MENU.GRH.ALLEMPLOYEES",
        type: "item",
        icon: "grid",
        url: "grh/employee/all-employees",
      },
    ],
  },

  //Menu GL_Workspace
  {
    id: "Workspace",
    type: "collapsible",
    title: "Workspace",
    icon: "menu",
    children: [
      {
        id: "forums",
        title: "FORUMS",
        type: "item",
        icon: "plus-square",
        url: "workspace/forums",
      },
      {
        id: "Documents",
        title: "Documents",
        type: "collapsible",
        icon: "grid",
      },
      {
        id: "Configuration",
        title: "Configuration",
        type: "collapsible",
        icon: "grid",
      },
    ],
  },
  {
    id: "learning",
    title: "MENU.Learning",
    type: "collapsible",
    icon: "menu",
    children: [
      {
        id: "training",
        title: "Training",
        type: "item",
        icon: "book-open",
        url: "learning/training/",
      },
      {
        id: "faq",
        title: "FAQ",
        type: "item",
        icon: "help-circle",
        url: "#",
      },
      {
        id: "quiz",
        title: "Quiz",
        type: "item",
        icon: "book",
        url: "#",
      },
      {
        id: "reports",
        title: "Reports",
        type: "item",
        icon: "file",
        url: "#",
      },
    ],
  },
];
