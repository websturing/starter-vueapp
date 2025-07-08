<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card ">
                    <Tabs value="1" class="p-2">
                        <TabList>
                            <Tab value="0">
                                <i class="icon icon-hair-man  text-sm opacity-10"></i>
                                Roles Management
                            </Tab>
                            <Tab value="1">
                                <i class="icon icon-paragraph-3  text-sm opacity-10"></i>
                                Menus Management
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="0">
                                <RolesView />
                            </TabPanel>
                            <TabPanel value="1">
                                <MenuView />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';

import MenuView from '@module/menu/views/MenuView.vue';
import RolesView from '@module/roles/views/RolesView.vue';


</script>