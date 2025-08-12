<template>
    <div>
        <div class="p-3 mt-2">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="mb-1">Total Strength</h5>
                    <p class="mt-0 text-sm">Your overall Today team attendance</p>
                </div>
                <div class="me-3">
                    <h2>
                        <Skeleton size="4rem" class="mb-2"></Skeleton>
                    </h2>
                </div>
            </div>
            <div class="d-flex gap-2 justify-content-center align-items-center mb-2">
                <Skeleton size="1.2rem" />
                <Skeleton width="2.2rem" />
                <Skeleton size="1.2rem" />
                <Skeleton width="2.2rem" />
                <Skeleton size="1.2rem" />
                <Skeleton width="2.2rem" />
                <Skeleton size="1.2rem" />
                <Skeleton width="2.2rem" />
            </div>
            <Skeleton class="mb-2" height="5rem"></Skeleton>
            <Skeleton class="mb-2" height="2rem"></Skeleton>
        </div>
    </div>
</template>