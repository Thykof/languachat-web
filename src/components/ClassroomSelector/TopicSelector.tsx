import React, { useEffect } from 'react';
import { publish } from '../../service/event';
import { Topic, getTopics } from '../../service/topics';

export const EVENT_TOPIC_SELECTED = 'topic-selected';

export interface TopicSelectedEvent {
  topic: Topic;
}

interface TopicSelectorProps {
  topic: Topic | null;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ topic: selectedTopic }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const topicSelected = (topic: Topic) => () => {
    publish(EVENT_TOPIC_SELECTED, { topic });
  };

  useEffect(() => {
    if (topics.length === 0) {
      getTopics().then((topics) => setTopics(topics));
    }
  });

  return (
    <div className="flex flex-wrap justify-center pb-2">
      {topics.length === 0 ? (
        <button className="btn btn-secondary mr-2 mb-2">
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      ) : (
        topics.map((topic) => (
          <button
            key={topic._id}
            className={`btn ${
              selectedTopic === null || selectedTopic._id === topic._id ? '' : 'btn-disabled'
            } btn-secondary mr-2 mb-2`}
            onClick={topicSelected(topic)}
          >
            {topic.name}
          </button>
        ))
      )}
    </div>
  );
};
