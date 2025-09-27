import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default function AddCircle() {
  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="Add Circle" />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border">
        Here the nfc workflow will be implemented
        </div>
      </Page.Main>
    </>
  );
}
