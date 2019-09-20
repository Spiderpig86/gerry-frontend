import * as React from 'react';

import { Tab } from 'react-tabs';

export const CustomTab = ({ children }) => (
    <Tab>
      <h6>{children}</h6>
    </Tab>
);
// CustomTab.tabsRole = 'Tab'; // Required field to use your custom Tab