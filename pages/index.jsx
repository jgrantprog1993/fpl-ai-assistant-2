import Page from '../components/page'; // Adjusted path if necessary
import Section from '../components/section';

const Index = () => (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				We grow a lot of rice.
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
					Test
					<span className='font-medium text-zinc-900 dark:text-zinc-50'>
					
					</span>{' '}
					worldwide.
				</p>
				<br />
			</div>
		</Section>
	</Page>
)

export default Index
