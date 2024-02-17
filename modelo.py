from  nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import Counter
import re

text_input = """AI is poised to transform every industry, but almost every AI application needs to be
customized for its particular use. A system for reading medical records is different
from one for finding defects in a factory, which is different from a product recom‐
mendation engine. For AI to reach its full potential, engineers need tools that can
help them adapt the amazing capabilities available to the millions of concrete prob‐
lems we wish to solve.
When I led the Google Brain team, we started to build the C++ precursor to
TensorFlow called DistBelief. We were excited about the potential of harnessing thou‐
sands of CPUs to train a neural network (for instance, using 16,000 CPUs to train a
cat detector on unlabeled YouTube videos). How far deep learning has come since
then! What was once cutting-edge can now be done for around $3,000 of cloud com‐
puting credits, and Google routinely trains neural networks using TPUs and GPUs at
a scale that was unimaginable just years ago.
TensorFlow, too, has come a long way. It is far more usable than what we had in the
early days, and has rich features ranging from modeling, to using pretrained models,
to deploying on low-compute edge devices. It is today empowering hundreds of thou‐
sands of developers to build their own deep learning models.
Laurence Moroney, as Google’s lead AI Advocate, has been a major force in building
TensorFlow into one of the world’s leading AI frameworks. I was privileged to sup‐
port his teaching TensorFlow with deeplearning.ai and Coursera. These courses have
reached over 80,000 learners and received numerous glowing reviews.
One unexpected aspect of friendship with Laurence is that he is also a free source of
Irish poetry. He once Slacked me"""



stop_words = stopwords.words('english')

text_no_break = re.sub(r'‐\n', '', text_input)

text_tokenized = word_tokenize(text_no_break)

text_tokenized = [palabra for palabra in text_tokenized if not palabra in stop_words]

ranking = Counter(text_tokenized)

print(ranking)


