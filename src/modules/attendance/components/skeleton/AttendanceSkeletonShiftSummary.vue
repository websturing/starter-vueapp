<template>
    <div>
        <div class="d-flex gap-3">
            <div class="card" style="width:calc(30% - 0.5rem)" v-for="(item, key) in 4" :key="key">
                <div class="p-3 mt-2">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="mb-1">
                                <Skeleton width="10rem" height="1.5rem" class="mb-2"></Skeleton>
                            </h5>
                            <p class="mt-0 text-sm">
                                <Skeleton class="mb-2"></Skeleton>
                            </p>
                        </div>
                        <div class="me-3">
                            <i class="icon icon-arrow-door-in"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted text-xs ">Check In Average</span>
                            <h2>
                                <Skeleton class="mb-2" height="3rem"></Skeleton>
                            </h2>
                        </div>
                        <div>
                            <span class="text-muted text-xs">On Time</span>
                            <h4>
                                <Skeleton class="mb-2"></Skeleton>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>