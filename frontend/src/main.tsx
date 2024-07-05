import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'

const queryClient = new QueryClient()
const router = createRouter({routeTree, context: {queryClient}})
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>
)
