"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { HOSTING_MAIN_TABS_LIST } from "./hosting-constants"
import { useSessionContext } from "supertokens-auth-react/recipe/session"
import { useAuth } from "../hooks/use-auth"

export const CompleteListingButton = () => {
    const session = useSessionContext()
    if (session.loading)
        return null
};

export const HostingMain = () => {
    const { first_name } = useAuth()

    return (
        <div className="space-y-8">
            <div className="font-semibold text-lg md:text-xl lg:text-3xl">Welcome, {first_name}!</div>
            <Tabs defaultValue={HOSTING_MAIN_TABS_LIST.data[0]?.value} className="w-full overflow-x-auto">
                <TabsList className='space-x-2 mb-6'>
                    {
                        HOSTING_MAIN_TABS_LIST.data.map((tab, index) => {
                            return (
                                <TabsTrigger
                                    className="rounded-full font-light px-4 border-2 "
                                    key={index}
                                    value={tab.value}>
                                    {tab.name}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
                {
                    HOSTING_MAIN_TABS_LIST.data.map((tab, index) => {
                        return (
                            <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
                        )
                    })
                }
            </Tabs>
        </div >
    )
}
