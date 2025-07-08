import { faqs } from '@/helpers/faqs';
import FAQContent from '@/components/landing/FAQContent';

export default function FAQsPage() {
	return <FAQContent items={faqs} />;
}
