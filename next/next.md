# NEXT JS

Start a new Next.js project by running the following command and configure the project accordingly.

all pages are server side rending by default

use "use client" diractive at the top of file to make it client side rendering


```shell
npx create-next-app@latest
```

## Folder structure

- **my-project/**
  - **.next**
  - **public**
  - **node_modules**
  - **src/**
    - **app/**
      - page.tsx
  - **package.json**
  - **package.lock.json**
  - **next.config.json**
  - **tsconfig.json**


Next.js will create a .next folder when running the development or build process, and it will serve the necessary files from that folder

## App Router

* All routes must be inside the app folder  
* All files that corresponds to a route must be names as page.tsx/page.js
* every folder corresponds to a path in the browser url

### Examples

> http://localhost:3000/

the folder structure should follow to impelement the "/" route

- **my-project/**
  - **src/**
    - **app/**
      - layout.tsx - (it will create automatically)
      - page.tsx

```ts
// src/app/page.tsx

export default function Dashboard(){
    return (<div>dashboard</div>)
}
```

---
> http://localhost:3000/about

the folder structure should follow to impelement the "/about" route

- **my-project/**
  - **src/**
    - **app/**
      - **about/**
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx  

```ts
// src/app/about/page.tsx

export default function AboutScreen(){
    return (<div>about page</div>)
}
```

---

> http://localhost:3000/profile  
> http://localhost:3000/about

the folder structure should follow to impelement the "/profile" and /about route

- **my-project/**
  - **src/**
    - **app/**
      - **profile/**
        - page.tsx
      - **about/**
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

```ts
// src/app/about/page.tsx

export default function AboutScreen(){
    return (<div>about page</div>)
}

// src/app/profile/page.tsx

export default function ProfileScreen(){
    return (<div>about page</div>)
}
```

---

### Nested routes

> http://localhost:3000/profile/create  

the folder structure should follow to impelement the "/profile/create" route

- **my-project/**
  - **src/**
    - **app/**
      - **about/**
        - page.tsx
      - **profile/**
        - page.tsx
          - **create/**
            - page.tsx
          - **update/**
            - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

```ts
// src/app/profile/page.tsx

export default function ProfileScreen(){
    return (<div>profile page</div>)
}
// src/app/profile/create/page.tsx

export default function CreateProfile(){
    return (<div>create profile page</div>)
}

```

---

### Dynamic routes

> http://localhost:3000/product/:productId  

the folder structure should follow to impelement the "/profile/:productId" route

- **my-project/**
  - **src/**
    - **app/**
      - **product/**
        - page.tsx
          - **[productId]/**
            - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

The params will be available in the props. We can extract the **":productId"** from the params to access it.

```ts
// src/app/product/page.tsx

export default function ProductScreen(){
    return (<div>product page</div>)
}

// src/app/product/[productId]/page.tsx

interface IParams{
    params: { productId: string }
}

export default function ProducDetails({ params }: IParams){
    return (<div>product id = {params.productId}</div>)
}
```

---

### Nested Dynamic routes

> http://localhost:3000/product/:productId/review/:reviewId

the folder structure should follow to impelement the "/product/:productId/review/reviewId" route

- **my-project/**
  - **src/**
    - **app/**
      - **product/**
        - page.tsx
          - **[productId]/**
            - page.tsx
              - **review/**
                - page.tsx
                  - **[reviewId]/**
                        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

The params will be available in the props. We can extract the **":productId"** from the params to access it.

```ts
// src/app/product/page.tsx
export default function ProductScreen(){
    return (<div>product page</div>)
}

// src/app/product/[productId]/page.tsx
interface IParams{
    params: { productId: string }
}

export default function ProducDetails({ params }: IParams){
    return (<div>product id = {params.productId}</div>)
}
// src/app/product/[productId]/review/page.tsx
export default function ReviewScreen(){
    return (<div>review page</div>)
}

// src/app/product/[productId]/review/[productId]/page.tsx
interface IParams{
    params: { productId: string }
}
export default function reviewDetails({ params }: IParams){
    return (<div>review id = {params.productId}</div>)
}
```

---
> http://localhost:3000/docs/:sectionId/:featureId

the folder structure should follow to impelement the "/docs/:sectionId/:featureId/...reviewId" route

- **my-project/**
  - **src/**
    - **app/**
      - **docs/**
        - [...slug]
          - page.tsx

      - layout.tsx - (it will create automatically)
      - page.tsx

we have to redirect to components with slug length and slug switch

---
> http://localhost:3000/docs/:sectionId/:featureId

the folder structure should follow to impelement the "/docs/:sectionId/:featureId/...reviewId" route

- **my-project/**
  - **src/**
    - **app/**
      - **docs/**
        - [[...slug]]
          - page.tsx

      - layout.tsx - (it will create automatically)
      - page.tsx

routing will support for /docs as well

---

### Notfound

custom not found page

- **my-project/**
  - **src/**
    - **app/**
      - layout.tsx - (it will create automatically)
      - page.tsx
      - not-found.tsx

``` ts
export default function NotFound(){
    return (
        <div>not found</div>
    )
}
```

---

### Programatic rediraction to Notfound

use the notFound method to redirect to notFound page

``` ts
// src/app/product/page.tsx

export default function ProductScreen(){
    return (<div>product page</div>)
}

// src/app/product/[productId]/page.tsx
import {notFound} from "next/navigation"

interface IParams{
    params: { productId: string }
}

export default function ProducDetails({ params }: IParams){
    if(params.productId>10){
        notFound()
    }
    return (<div>product id = {params.productId}</div>)
}
```

we can define the notFound page in the folder level as well

- **my-project/**
  - **src/**
    - **app/**
      - **product/**
        - page.tsx
        - not-found.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

---

### Componenets 

it's better to keep the supporting components in a seperate path

- **my-project/**
  - **src/**
    - **componenets/**
      - MyComponenet.tsx
    - **app/**
      - layout.tsx - (it will create automatically)
      - page.tsx

---

### Privete folder

* should not be considered in routing system
* folder and all it's sub folders considered as private
* prefix the folder name with under score ( _ )
* page.tsx inside this follder also unroutable.
* if we want use _ in route url , then we can use %5F (url ecoded formate of underscore)

- **my-project/**
  - **src/**
    - **app/**
      - **_lib/**
        - xyz.ts
        - xyz.ts
        - xyz.ts
      - **product/**
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

---

### Route groups

bind folder name inside ().

URLs

>http://localhost:3001/product  
>http://localhost:3001/login -- auth will never considered in routing  
>http://localhost:3001/register  --auth will never considered in routing  

- **my-project/**
  - **src/**
    - **app/**
      - **(auth)/**
        - **login/**
          - page.tsx
        - **register/**
          - page.tsx
      - **product/**
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

---

### Layouts

* create layout by defult exporting a layout.js/layout.tsx file
* component should accept a children component in props and that will populate with a child page during rendering

### Nested layout

create a layout.tsx/layout.js file inside the route dir

- **my-project/**
  - **src/**
    - **app/**
      - **product/**
        - layout.tsx
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

---

### Routing metadata

#### Metadata rules

Both layout.tsx and page.tsx can export the metadata. if defined in layout, it will be applicable ofr all the pages in that layout. if defined in page it will be applicable only for that page

##### static metadata
```ts
// src/app/about/page.tsx

export const metadata={
    title:"seo title"
}

//in above case description will be retrived from layout.tsx
```

##### dynamic metadata

```ts
// src/app/about/page.tsx
import {Metadata} from "next"


export const generateMetadata=():Metadata=>{
    return {
        title:"",
        description:""
    }
}

```

---

##### title metadata

```ts
import { Metadata } from "next"
export const metadata:Metadata={
    title:"seo totle"
    // or
    title:{
        absulute:"", //specific one
        default:"", //fallback title (if not defined for child/page)
        template:"%s | xyz"  //%s will replace with the content of page
    }

}
```

### Link componenet Navigation

* use Link componenet to navigate routes in client side


```ts
import Link from "next/link"

<Link href="/"> Home </Link> 

<Link href="/" replace> Home </Link> //replace the history
```

#### active url

```ts
"use client" // client side rendering
import {usePathname} from "next/navigation"

const pathname = usePathname()

const active= pathname.startsWith("/product")

```

#### programatic redirection

```ts
import {useRouter} from "next/navigation"

const router = useRouter()
router.push("/")

```

---

### Templates

* Layouts only mount the content that newly mounted. it will kepp reming thisgs as same 

* templates are similar to layouts, it wraps each layout or page. but if navigating b/w routes a new instance of component is mounted.ie, **DOM elements will recreate, state is not preserved, and effects are re-synchonized**.
* a template can be defined by exporting a default componenet from template.js/template.tsx

---

### Loading

create a loading loading.tsx and export it by default.

---
### Error

create a loading error.tsx and export it by default.

* it must be a client component
* error bubble up to a closest parent boundry
* an error.tsx file in parent will handle error for all child segments
* error.tsx will not handle the error occured in layout.tsx in the same segment

```ts
// src/app/product/error.tsx
interface IError{
    error:Error
}
export default function ErrorBoundry({error}:IError){
    return (
    <div>{error.message}</div>
    )
}
```

---
### Recovering from Error

write a **reset** method, which will again load the page.tsx.

* it (page.tsx) must be a client component

```ts
// src/app/product/error.tsx
interface IError{
    error:Error
    resest:()=>void
}
export default function ErrorBoundry({error,reset}:IError){
    return (
    <div>
        <p>{error.message}</p>
        <button onClick={reset}>try again</button>
    </div>
    )
}
```

---

### parallel routes

* create slots by using @ at the starting of folder name
* slots are not route segment and don't affect the route structure
* in this scenario we can add seperate loading and error for each slots layout.

- **my-project/**
  - **src/**
    - **app/**
      - **dashboard/**
        - **@analytics/**
          - page.tsx
        - **@notifocations/**
          - page.tsx
        - layout.tsx
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx

now , we can import this slot components as prop in layout.tsx

```ts
// src/app/dashboard/layout.tsx

interface IProps{
    children: React.ReactNode
    analytics: React.ReactNode
    notifications: React.ReactNode
}

//use the same names that we user to create a folder
export default function dashboardLayout({children, analytics, notifications}){
    <div>{children}</div>
    <div>{analytics}</div>
    <div>{notifications}</div>
}


```

we have can setup nested routes for the slots.in that case we ahve to keep default.tsx file in each slots for the fallback

---

### intercepting routes

* syntax - (.) //samelevel
* syntax - (..) //one level above
* syntax - (..)(..) //two level above
* intreceptor and actual component should be in same level

- **my-project/**
  - **src/**
    - **app/**
      - **dashboard/**
        - **(.)profile/**
          - page.tsx
        - **profile/**
          - page.tsx
        - layout.tsx
        - page.tsx
      - layout.tsx - (it will create automatically)
      - page.tsx


---

### Route handlers

* file name route.ts


```ts
// src/app/dashboard/route.ts

// GET
export async GET(){
  return Response("Dashboard")
}

// POST
export async POST(request,){
  const body = await request.json()
  return new Response(JSON.stringify(body),{
    headers:{
      "Content-Type":"application/json"
    },
    status: 201 //http status
  })
}

// dynamic (params)
// http://localhost:3001/dashboard/:id  
export async POST(request,{params}){
  const id = params.id
  return new Response(id)
}

// query
// http://localhost:3001/dashboard?name=xyz
import {NextRequest} from "next/server"
export async GET(request:NextRequest){
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get("name")
  return Response(name)
}

// redirect 
import {redirect} from "next/navigation"
export async GET(){
  redirect("/login")
}

// headers
import {headers} from "next/headers"
export async GET(request:NextRequest){

  const reqHeaders = new Heders(request.headers)
  console.log(reqHeaders.get("Authorization"))
  // or
  const headerList = headers()
  console.log(headerList.get("Authorization"))

  return Response("ok")
}
// cookies
import {cookies} from "next/headers"
export async GET(request:NextRequest){
  // get
  console.log(request.cookies.get("Authorization"))
  // set
  const cookieObj = cookies()
  cookieObj.set("name","xyz")

  return Response("ok")
}

```

### caching

* Route handlers are cached by default when using GET method with Response object
* to avoid the caching change dynamic to "force-dynamic".  (default if will be auto)

```ts
// src/app/dashboard/route.ts
export const dynmic = "force-dynamic";
```

---

### Middleware

* filename middleware.ts

```ts
// src/app/dashboard/middleware.ts
import {NextResponse, NextRequest} from "next/erver"
export function middleware(request:NextRequest){
  request.hesaders.set("name","hello")
  return NextResponse.next()
}
```

### Rendering

---

#### CSR

* The component code is transformed into a user interface directly within the browser is known as Client Side Rendering.
* CSR become the standard for SPAs.

##### drawbacks

* **SEO**: generating HTML content that mainly contains a single div tag is not optimal for SEO, as it provides little content for search engines to index.
* **performance**: Having the browser handles all the work, such as fetching data, computing UI,... can slow things down.
* Each new feature added to the application increases the size of JS bundle, prolonging the wait time for users to see the UI.

#### SSR

* SEO can easily index server side rendered content
* users can immidiatly see the page instaed of blank screen or loading spinner.

##### hydration

* during hydration, React takes control of browser,reconstructuing the tree in memory based on the static HTML that was serverd.
* **SSG**: occurs build time,when application deployed on the server.This results in pages that are already ready to serve.It is ideal for content, that does't change often like blogs posts.
* **SSR**: Component cannot start rendering while data is still being loaded.
* if a component needs to fetch data from a database or other source, this fetching must be completed before the server can begin rendering the page.

---

### Suspense

---

### React Server Components (RSC)

*
