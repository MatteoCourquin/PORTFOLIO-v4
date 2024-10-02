import PageTransition from '@/components/PageTransition';
import { TypeProject } from '@/data/types';
import Layout from '@/layout/default';
import SmoothScrolling from '@/layout/lenis';
import '@/styles/main.sass';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const createBaseRoutes = (projects: TypeProject | TypeProject[]) => {
    const baseRoutes: { [key: string]: string } = {};

    const projectArray = Array.isArray(projects) ? projects : [projects];

    projectArray.forEach((project: TypeProject) => {
      if (!project?.slug?.current || !project?.title) return;
      baseRoutes[`/projects/${project.slug.current}`] = project.title;
    });

    return baseRoutes;
  };

  return (
    <>
      {pathname?.includes('studio') ? (
        <Component key={pathname} {...pageProps} />
      ) : (
        <Layout>
          <SmoothScrolling>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <PageTransition
                key={pathname}
                project={createBaseRoutes(pageProps.projects || pageProps.project)}
              >
                <Component {...pageProps} />
              </PageTransition>
            </AnimatePresence>
          </SmoothScrolling>
        </Layout>
      )}
    </>
  );
}
