<!-- layouts/default.vue -->
<template>
    <div class="bg-background flex h-screen overflow-x-hidden">
        <SidebarProvider>
            <AppSidebar />

            <main class="flex min-h-0 min-w-0 flex-1 flex-col">


                <!-- layout box -->
                <div class="flex h-full min-h-0 w-full flex-1 flex-col">
                    <!-- scroll area definition -->
                    <div class="h-full w-full flex-1 overflow-y-auto overscroll-y-contain">
                        <!-- content container with max width for better readability -->
                        <div class="min-h-full w-full max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8">
                            <slot />
                        </div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    </div>
</template>

<script setup>
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
const userStore = useUserStore()

const username = computed(() => {
    const p = userStore.userProfile
    if (!p) return ''
    const first = p.firstName || ''
    const last = p.lastName || ''
    return `${first} ${last}`.trim()
})

const usernameInitials = computed(() => {
    if (!username.value) return ''
    const parts = username.value.split(' ').filter(Boolean)
    return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0]
})

onMounted(() => {
    if (!userStore.userProfile) {
        userStore.fetchUserProfile()
    }
})
</script>
